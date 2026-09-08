import fs from "node:fs/promises";
import path from "node:path";
import { normalizeWikiId, stabilizeWikiPageId } from "../src/features/wiki/wikiIds.js";

export { normalizeWikiId, stabilizeWikiPageId };

const PRIMARY_TYPES = new Set(["entity", "concept", "comparison", "query", "meetup"]);
const EXCLUDED_MANIFEST_PATHS = new Set(["TEMPLATE.md"]);

function toPosix(value) {
  return value.split(path.sep).join("/");
}

export function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) {
    return null;
  }

  const fields = {};

  for (const rawLine of match[1].split("\n")) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    fields[key] = parseFrontmatterValue(rawValue);
  }

  return fields;
}

function parseFrontmatterValue(rawValue) {
  if (/^\[.*\]$/.test(rawValue)) {
    const inner = rawValue.slice(1, -1).trim();

    if (!inner) {
      return [];
    }

    return inner
      .split(",")
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
      .filter(Boolean);
  }

  return rawValue.replace(/^['"]|['"]$/g, "");
}

function collectWikilinks(content) {
  const searchableContent = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "");
  const pattern = /\[\[([^\]\n]+)\]\]/g;
  const links = [];
  let match;

  while ((match = pattern.exec(searchableContent)) !== null) {
    const rawTarget = match[1].split("|")[0].split("#")[0].trim();

    if (rawTarget) {
      links.push(rawTarget);
    }
  }

  return [...new Set(links)];
}

function collectWikilinksFromLine(line) {
  const links = [];
  const pattern = /\[\[([^\]\n]+)\]\]/g;
  let match;

  while ((match = pattern.exec(line)) !== null) {
    const rawTarget = match[1].split("|")[0].split("#")[0].trim();

    if (rawTarget && !links.includes(rawTarget)) {
      links.push(rawTarget);
    }
  }

  return links;
}

function collectSourceLinks(content) {
  const searchableContent = content
    .replace(/^---\n[\s\S]*?\n---\n?/, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "");
  const links = [];
  const pattern = /https?:\/\/[^\s<>)\]]+/g;
  let match;

  while ((match = pattern.exec(searchableContent)) !== null) {
    const href = match[0].replace(/[.,;:!?]+$/g, "");

    if (!links.includes(href)) {
      links.push(href);
    }
  }

  return links;
}

function extractUrls(line) {
  const urls = [];
  const pattern = /https?:\/\/[^\s<>)\]]+/g;
  let match;

  while ((match = pattern.exec(line)) !== null) {
    urls.push(match[0].replace(/[.,;:!?]+$/g, ""));
  }

  return urls;
}

function collectSourceReferences(content, { sourceRecord = false } = {}) {
  const searchableContent = stripFrontmatter(content).replace(/```[\s\S]*?```/g, "");
  const references = [];
  let currentSection = "";
  let currentTitle = "";
  let currentTopicWikilinks = [];

  for (const rawLine of searchableContent.split("\n")) {
    const line = rawLine.trim();
    const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;
      const title = headingMatch[2].trim();

      if (sourceRecord && depth === 2) {
        currentSection = title;
        currentTitle = "";
        currentTopicWikilinks = [];
      } else if (sourceRecord && depth === 3) {
        currentTitle = title;
        currentTopicWikilinks = collectWikilinksFromLine(title);
      } else if (!sourceRecord && depth === 3) {
        currentSection = title;
        currentTitle = "";
        currentTopicWikilinks = [];
      } else if (!sourceRecord && depth > 3) {
        currentTitle = title;
        currentTopicWikilinks = collectWikilinksFromLine(title);
      } else if (!sourceRecord && depth === 2) {
        currentTitle = "";
        currentTopicWikilinks = [];
      }
    }

    const topicMatch = line.match(/^-\s+\*\*([^*]+)\*\*/);

    if (topicMatch) {
      currentTitle = topicMatch[1].trim();
      currentTopicWikilinks = collectWikilinksFromLine(line);
    } else if (currentTitle) {
      for (const wikilink of collectWikilinksFromLine(line)) {
        if (!currentTopicWikilinks.includes(wikilink)) {
          currentTopicWikilinks.push(wikilink);
        }
      }
    }

    for (const href of extractUrls(line)) {
      const reference = {
        href,
        title: currentTitle || currentSection || getSourceLinkTitle(href),
        section: currentSection,
        wikilinks: currentTopicWikilinks,
      };

      if (
        !references.some(
          (existing) =>
            existing.href === reference.href &&
            existing.title === reference.title &&
            existing.section === reference.section,
        )
      ) {
        references.push(reference);
      }
    }
  }

  return references;
}

function collectMentionedInTopicReferences(content) {
  const references = [];
  let inMentionedIn = false;

  for (const rawLine of stripFrontmatter(content).split("\n")) {
    const line = rawLine.trim();
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;
      const title = headingMatch[2].trim().toLowerCase();
      inMentionedIn = depth === 2 && title === "mentioned in";
      continue;
    }

    if (!inMentionedIn || !line.startsWith("- ")) {
      continue;
    }

    const meetupTitle = collectWikilinksFromLine(line)[0];
    const topicTitles = [...line.matchAll(/\*\*([^*]+)\*\*/g)]
      .map((match) => match[1].trim())
      .filter(Boolean);

    if (meetupTitle && topicTitles.length) {
      references.push({ meetupTitle, topicTitles });
    }
  }

  return references;
}

function normalizeTopicTitle(value) {
  return String(value ?? "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getReadableWikiText(value) {
  return String(value ?? "")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function getMeetupSlugFromPage(page) {
  const datedMatch = page.relativePath.match(/^(\d{4}-\d{2}-\d{2})\.md$/);

  if (datedMatch) {
    return datedMatch[1];
  }

  return normalizeWikiId(page.title);
}

function getTopicKey({ meetupId, section, title }) {
  return [
    meetupId,
    normalizeWikiId(section || "topic"),
    normalizeTopicTitle(title),
  ].join("::");
}

function buildTopicId({ meetupId, section, title }) {
  return [
    meetupId,
    normalizeWikiId(section || "topic"),
    normalizeWikiId(getReadableWikiText(title)),
  ]
    .filter(Boolean)
    .join("-");
}

function getStableIdSuffix(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

function disambiguateTopicIds(topics) {
  const groups = new Map();

  for (const topic of topics) {
    const group = groups.get(topic.id) ?? [];
    group.push(topic);
    groups.set(topic.id, group);
  }

  const claimedIds = new Set();

  for (const group of groups.values()) {
    const needsSuffix = group.length > 1 || claimedIds.has(group[0].id);
    const sortedGroup = [...group].sort(
      (a, b) =>
        a.meetupId.localeCompare(b.meetupId) ||
        a.section.localeCompare(b.section) ||
        a.normalizedTitle.localeCompare(b.normalizedTitle),
    );

    for (const topic of sortedGroup) {
      if (!needsSuffix && !claimedIds.has(topic.id)) {
        claimedIds.add(topic.id);
        continue;
      }

      const baseId = topic.id;
      const suffix = getStableIdSuffix(
        [topic.meetupId, topic.section, topic.normalizedTitle].join("::"),
      );
      let candidateId = `${baseId}-${suffix}`;
      let attempt = 2;

      while (claimedIds.has(candidateId)) {
        candidateId = `${baseId}-${suffix}-${attempt}`;
        attempt += 1;
      }

      topic.id = candidateId;
      claimedIds.add(candidateId);
    }
  }
}

function addUniqueSorted(list, value) {
  if (!value || list.includes(value)) {
    return;
  }

  list.push(value);
  list.sort();
}

function getSourceLinkTitle(href) {
  try {
    const url = new URL(href);
    return `${url.hostname}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return href;
  }
}

function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

function getExcerpt(content) {
  const body = stripFrontmatter(content)
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .find((line) => !line.startsWith("#") && !line.startsWith("- ") && !line.startsWith(">"));

  if (!body) {
    return "";
  }

  return body
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

async function collectMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(entryPath);
    }
  }

  return files;
}

/**
 * Resolves a title or wikilink against catalog aliases, including Sovereign titles
 * that keep historical `austin-ai-club-*` ids.
 * @param {Map<string, string>} titleToId
 * @param {string} value
 * @returns {string | undefined}
 */
function resolveWikiTargetId(titleToId, value) {
  return titleToId.get(stabilizeWikiPageId(value)) ?? titleToId.get(normalizeWikiId(value));
}

function createPage({ content, file, frontmatter, topicsDir }) {
  const relativePath = toPosix(path.relative(topicsDir, file));
  // Historical URL stability after the club rename: meetup ids stay austin-ai-club-*.
  const id = stabilizeWikiPageId(frontmatter.title || relativePath);
  const sources = Array.isArray(frontmatter.sources) ? frontmatter.sources : [];
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const sourceLinks = collectSourceLinks(content);
  const sourceReferences = collectSourceReferences(content, {
    sourceRecord: tags.includes("source-record"),
  });

  const page = {
    id,
    title: frontmatter.title || id,
    type: frontmatter.type || "summary",
    tags,
    sources,
    sourceCount: sources.length,
    sourceLinks,
    sourceReferences,
    created: frontmatter.created || "",
    updated: frontmatter.updated || "",
    excerpt: getExcerpt(content),
    rawHref: `/topics/${relativePath}`,
    relativePath,
    outgoingIds: [],
    unresolvedLinks: [],
    backlinkIds: [],
    referencedTopicSources: [],
    wikilinks: collectWikilinks(content),
    mentionedInTopicReferences: collectMentionedInTopicReferences(content),
  };

  if (["entity", "concept"].includes(page.type)) {
    page.bodyMarkdown = stripFrontmatter(content).trim();
  }

  return page;
}

function shouldIncludeInManifest(relativePath) {
  return !EXCLUDED_MANIFEST_PATHS.has(relativePath);
}

function sortByTitle(a, b) {
  return a.title.localeCompare(b.title) || a.id.localeCompare(b.id);
}

function addReferencedTopicSource(page, reference, sourcePage) {
  const item = {
    href: reference.href,
    title: reference.title,
    section: reference.section,
    sourcePageId: sourcePage.id,
    sourcePageTitle: sourcePage.title,
  };

  if (
    !page.referencedTopicSources.some(
      (existing) =>
        existing.href === item.href &&
        existing.title === item.title &&
        existing.section === item.section &&
        existing.sourcePageId === item.sourcePageId,
    )
  ) {
    page.referencedTopicSources.push(item);
  }
}

function addTopicSourceReference(topic, reference) {
  const sourceReference = {
    href: reference.href,
    title: getReadableWikiText(reference.title),
    section: reference.section,
  };

  if (
    !topic.sourceReferences.some(
      (existing) =>
        existing.href === sourceReference.href &&
        existing.title === sourceReference.title &&
        existing.section === sourceReference.section,
    )
  ) {
    topic.sourceReferences.push(sourceReference);
  }

  if (!topic.sourceLinks.includes(reference.href)) {
    topic.sourceLinks.push(reference.href);
  }
}

function addTopicWikiId(topic, id) {
  addUniqueSorted(topic.wikiIds, id);
}

function addGraphLink({ links, pagesById, sourceId, targetId }) {
  const sourcePage = pagesById[sourceId];
  const targetPage = pagesById[targetId];

  if (!sourcePage || !targetPage || sourceId === targetId) {
    return;
  }

  if (!sourcePage.outgoingIds.includes(targetId)) {
    sourcePage.outgoingIds.push(targetId);
    sourcePage.outgoingIds.sort();
  }

  if (!targetPage.backlinkIds.includes(sourceId)) {
    targetPage.backlinkIds.push(sourceId);
    targetPage.backlinkIds.sort();
  }

  if (!links.some((link) => link.source === sourceId && link.target === targetId)) {
    links.push({ source: sourceId, target: targetId });
  }
}

function isPublicPage(page) {
  return PRIMARY_TYPES.has(page.type) || page.relativePath.startsWith("raw/articles/");
}

export async function buildWikiManifest({ topicsDir }) {
  const files = await collectMarkdownFiles(topicsDir);
  const candidates = [];

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    const frontmatter = parseFrontmatter(content);
    const relativePath = toPosix(path.relative(topicsDir, file));

    if (!frontmatter || !shouldIncludeInManifest(relativePath)) {
      continue;
    }

    candidates.push(createPage({ content, file, frontmatter, topicsDir }));
  }

  const pages = candidates
    .filter((page) => isPublicPage(page))
    .sort(sortByTitle);
  const rawPages = candidates
    .filter((page) => !pages.some((candidate) => candidate.id === page.id))
    .sort(sortByTitle);
  const pagesById = Object.fromEntries(pages.map((page) => [page.id, page]));
  const titleToId = new Map();

  for (const page of pages) {
    for (const alias of [page.title, page.relativePath, page.id]) {
      for (const normalizedAlias of new Set([
        stabilizeWikiPageId(alias),
        normalizeWikiId(alias),
      ])) {
        if (normalizedAlias && !titleToId.has(normalizedAlias)) {
          titleToId.set(normalizedAlias, page.id);
        }
      }
    }
  }

  const links = [];
  const unresolvedLinks = [];

  for (const page of pages) {
    const outgoingIds = [];
    const missingLinks = [];

    for (const wikilink of page.wikilinks) {
      const targetId = resolveWikiTargetId(titleToId, wikilink);

      if (!targetId) {
        missingLinks.push(wikilink);
        unresolvedLinks.push({ source: page.id, target: wikilink });
        continue;
      }

      if (targetId !== page.id && !outgoingIds.includes(targetId)) {
        outgoingIds.push(targetId);
        links.push({ source: page.id, target: targetId });
      }
    }

    page.outgoingIds = outgoingIds.sort();
    page.unresolvedLinks = missingLinks.sort();
  }

  for (const page of pages) {
    page.backlinkIds = links
      .filter((link) => link.target === page.id)
      .map((link) => link.source)
      .sort();
    delete page.wikilinks;
  }

  const trackConcepts = pages.filter((page) => page.type === "concept" && page.tags.includes("track"));
  const topicRecordsByKey = new Map();

  function upsertTopicRecord(sourcePage, reference) {
    if (!reference.title || !reference.href) {
      return null;
    }

    const key = getTopicKey({
      meetupId: sourcePage.id,
      section: reference.section,
      title: reference.title,
    });

    if (!topicRecordsByKey.has(key)) {
      topicRecordsByKey.set(key, {
        id: buildTopicId({
          meetupId: sourcePage.id,
          section: reference.section,
          title: reference.title,
        }),
        title: getReadableWikiText(reference.title),
        rawTitle: reference.title,
        normalizedTitle: normalizeTopicTitle(reference.title),
        section: reference.section,
        meetupId: sourcePage.id,
        meetupTitle: sourcePage.title,
        meetupSlug: getMeetupSlugFromPage(sourcePage),
        meetupHref: sourcePage.rawHref,
        sourceLinks: [],
        sourceReferences: [],
        wikiIds: [],
        wikiTitles: [],
        unresolvedWikiLinks: [],
        searchText: "",
      });
    }

    const topic = topicRecordsByKey.get(key);
    addTopicSourceReference(topic, reference);

    const matchingConcept = trackConcepts.find(
      (page) => normalizeWikiId(reference.section) === page.id,
    );

    if (matchingConcept) {
      addTopicWikiId(topic, matchingConcept.id);
    }

    for (const wikilink of reference.wikilinks) {
      const targetId = resolveWikiTargetId(titleToId, wikilink);

      if (targetId) {
        addTopicWikiId(topic, targetId);
      } else if (!topic.unresolvedWikiLinks.includes(wikilink)) {
        topic.unresolvedWikiLinks.push(wikilink);
        topic.unresolvedWikiLinks.sort();
      }
    }

    return topic;
  }

  for (const sourcePage of pages.filter((page) => page.type === "meetup")) {
    for (const reference of sourcePage.sourceReferences) {
      upsertTopicRecord(sourcePage, reference);

      const matchingConcept = trackConcepts.find(
        (page) => normalizeWikiId(reference.section) === page.id,
      );

      if (matchingConcept) {
        addReferencedTopicSource(matchingConcept, reference, sourcePage);
      }

      for (const wikilink of reference.wikilinks) {
        const targetPage = pagesById[resolveWikiTargetId(titleToId, wikilink)];

        if (targetPage) {
          addReferencedTopicSource(targetPage, reference, sourcePage);
        }
      }
    }
  }

  for (const page of pages.filter((candidate) => ["concept", "entity"].includes(candidate.type))) {
    for (const mention of page.mentionedInTopicReferences) {
      const sourcePage = pagesById[resolveWikiTargetId(titleToId, mention.meetupTitle)];

      if (!sourcePage) {
        continue;
      }

      const topicTitles = new Set(mention.topicTitles.map(normalizeTopicTitle));

      for (const reference of sourcePage.sourceReferences) {
        if (topicTitles.has(normalizeTopicTitle(reference.title))) {
          addReferencedTopicSource(page, reference, sourcePage);
          const topic = upsertTopicRecord(sourcePage, reference);
          if (topic) {
            addTopicWikiId(topic, page.id);
          }
          addGraphLink({
            links,
            pagesById,
            sourceId: sourcePage.id,
            targetId: page.id,
          });
        }
      }
    }
  }

  for (const page of pages) {
    for (const reference of page.sourceReferences) {
      delete reference.wikilinks;
    }

    delete page.mentionedInTopicReferences;
  }

  const topics = [...topicRecordsByKey.values()].map((topic) => {
    topic.sourceReferences.sort(
      (a, b) =>
        a.section.localeCompare(b.section) ||
        a.title.localeCompare(b.title) ||
        a.href.localeCompare(b.href),
    );
    topic.wikiIds.sort((a, b) => {
      const titleA = pagesById[a]?.title ?? a;
      const titleB = pagesById[b]?.title ?? b;
      return titleA.localeCompare(titleB) || a.localeCompare(b);
    });
    topic.wikiTitles = topic.wikiIds.map((id) => pagesById[id]?.title ?? id);
    topic.searchText = [
      topic.title,
      topic.section,
      topic.meetupTitle,
      topic.meetupSlug,
      ...topic.sourceLinks,
      ...topic.wikiTitles,
    ]
      .filter(Boolean)
      .join(" ");

    return topic;
  }).sort((a, b) => {
    const meetupDiff = b.meetupSlug.localeCompare(a.meetupSlug);
    return meetupDiff || a.section.localeCompare(b.section) || a.title.localeCompare(b.title);
  });
  disambiguateTopicIds(topics);
  const topicsById = Object.fromEntries(topics.map((topic) => [topic.id, topic]));

  const graph = {
    nodes: pages.map((page) => ({
      id: page.id,
      label: page.title,
      type: page.type,
      tags: page.tags,
      degree: page.outgoingIds.length + page.backlinkIds.length,
      updated: page.updated || page.created || "",
    })),
    links: links.map((link) => {
      const sourcePage = pagesById[link.source];
      const targetPage = pagesById[link.target];
      const isMeetupSource = sourcePage?.type === "meetup";
      const isMeetupTarget = targetPage?.type === "meetup";
      const kind = isMeetupSource || isMeetupTarget ? "topic" : "wiki";

      return { ...link, kind };
    }),
  };
  const sourceLinkCount = new Set(pages.flatMap((page) => page.sourceLinks)).size;
  const sourceRecordCount = pages.filter((page) => page.tags.includes("source-record")).length;
  const lastUpdatedAt = pages
    .map((page) => page.updated || page.created || "")
    .filter(Boolean)
    .sort()
    .at(-1) ?? "";

  return {
    generatedAt: new Date().toISOString(),
    pages,
    pagesById,
    topics,
    topicsById,
    rawPages,
    links,
    unresolvedLinks,
    graph,
    stats: {
      pageCount: pages.length,
      topicCount: topics.length,
      rawPageCount: rawPages.length,
      linkCount: links.length,
      sourceRecordCount,
      sourceLinkCount,
      unresolvedLinkCount: unresolvedLinks.length,
      lastUpdatedAt,
    },
  };
}
