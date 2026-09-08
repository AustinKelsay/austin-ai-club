import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { meetups } from "../src/data.js";
import { normalizeWikiId, stabilizeWikiPageId } from "../src/features/wiki/wikiIds.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const topicsDir = path.join(repoRoot, "public", "topics");

const requiredPaths = [
  "SCHEMA.md",
  "README.md",
  "index.md",
  "log.md",
  "raw/articles",
  "raw/papers",
  "raw/transcripts",
  "raw/assets",
  "entities",
  "concepts",
  "comparisons",
  "queries",
];

const requiredFrontmatter = ["title", "created", "updated", "type", "tags", "sources"];
const validTypes = new Set(["entity", "concept", "comparison", "query", "summary", "meetup"]);
const indexTrackedTypes = new Set(["entity", "concept", "comparison", "query", "meetup"]);
const standardRelatedPageIds = new Set([
  "local-builds-projects",
  "agent-infrastructure",
  "models-research",
  "security",
  "big-tech-moves",
]);
const MEETUP_WIKILINK_PREFIX = "Sovereign AI Club - ";
const RETIRED_CLUB_NAME = "Austin AI Club";
const errors = [];

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n?/, "");
}

function normalizeTopicTitle(value) {
  return value
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function collectUrls(content) {
  const urls = new Set();

  for (const match of content.matchAll(/https?:\/\/[^\s<>)"]+/g)) {
    const url = match[0].replace(/[.,;:]+$/g, "");
    urls.add(url);
  }

  return urls;
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
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

function parseFrontmatter(content) {
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
    fields[key] = rawValue;
  }

  return fields;
}

function parseInlineArray(rawValue) {
  const match = String(rawValue ?? "").trim().match(/^\[(.*)\]$/);

  if (!match || !match[1].trim()) {
    return [];
  }

  return match[1]
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function checkFrontmatter(file, frontmatter) {
  const rel = toPosix(path.relative(repoRoot, file));

  for (const field of requiredFrontmatter) {
    if (!frontmatter[field]) {
      errors.push(`${rel}: missing frontmatter field "${field}"`);
    }
  }

  if (frontmatter.type && !validTypes.has(frontmatter.type)) {
    errors.push(`${rel}: invalid frontmatter type "${frontmatter.type}"`);
  }

  for (const listField of ["tags", "sources"]) {
    if (frontmatter[listField] && !/^\[.*\]$/.test(frontmatter[listField])) {
      errors.push(`${rel}: frontmatter field "${listField}" must use inline array syntax`);
    }
  }
}

function collectWikilinks(content) {
  const links = [];
  const searchableContent = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "");
  const pattern = /\[\[([^\]\n]+)\]\]/g;
  let match;

  while ((match = pattern.exec(searchableContent)) !== null) {
    const rawTarget = match[1].split("|")[0].split("#")[0].trim();

    if (rawTarget) {
      links.push(rawTarget);
    }
  }

  return links;
}

function collectTopicBlocks(content, meetupTitle) {
  const topicBlocks = [];
  const lines = content.split("\n");
  let currentSection = "";
  let currentBlock = null;

  const flushCurrentBlock = () => {
    if (currentBlock) {
      topicBlocks.push(currentBlock);
      currentBlock = null;
    }
  };

  for (const [index, line] of lines.entries()) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      flushCurrentBlock();

      if (headingMatch[1].length === 2) {
        currentSection = headingMatch[2].trim();
      }

      continue;
    }

    const topicMatch = line.match(/^-\s+\*\*([^*]+)\*\*/);

    if (topicMatch) {
      flushCurrentBlock();
      currentBlock = {
        line: index + 1,
        meetupTitle,
        section: currentSection,
        title: topicMatch[1],
        text: line,
      };
      continue;
    }

    if (currentBlock) {
      currentBlock.text += `\n${line}`;
    }
  }

  flushCurrentBlock();
  return topicBlocks;
}

function collectSourceRecordTopicGroups(content) {
  const groupsByTitle = new Map();
  const lines = stripFrontmatter(content).split("\n");
  let currentGroup = null;

  const flushCurrentGroup = () => {
    if (currentGroup) {
      groupsByTitle.set(normalizeTopicTitle(currentGroup.title), currentGroup);
      currentGroup = null;
    }
  };

  for (const [index, line] of lines.entries()) {
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;

      if (depth === 3) {
        flushCurrentGroup();
        currentGroup = {
          line: index + 1,
          title: headingMatch[2].trim(),
          text: line,
        };
      } else if (depth <= 2) {
        flushCurrentGroup();
      } else if (currentGroup) {
        currentGroup.text += `\n${line}`;
      }

      continue;
    }

    if (currentGroup) {
      currentGroup.text += `\n${line}`;
    }
  }

  flushCurrentGroup();
  return groupsByTitle;
}

async function checkRawRecords() {
  const rawDir = path.join(topicsDir, "raw");
  const files = await collectMarkdownFiles(rawDir);

  for (const file of files) {
    const content = await fs.readFile(file, "utf8");
    const rel = toPosix(path.relative(repoRoot, file));
    const body = content.replace(/^---\n[\s\S]*?\n---\n?/, "");
    const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
    const urlCount = (body.match(/https?:\/\//g) ?? []).length;

    if (wordCount > 800 && urlCount < 4) {
      errors.push(`${rel}: raw records should be link metadata, not full copied source text`);
    }

    if (rel.match(/^public\/topics\/raw\/articles\/\d{4}-\d{2}-\d{2}-link-records\.md$/)) {
      errors.push(...checkDatedSourceLinkRecordHierarchy(rel, body));
    }
  }
}

export function checkDatedSourceLinkRecordHierarchy(rel, body) {
  const hierarchyErrors = [];
  const lines = body.split("\n");
  let currentSection = null;
  let currentGroup = null;

  for (const [index, rawLine] of lines.entries()) {
    const line = rawLine.trimEnd();
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;
      const title = headingMatch[2].trim();

      if (depth === 2) {
        currentSection = title;
        currentGroup = null;
      } else if (depth === 3) {
        currentGroup = title;
      } else if (depth <= 1) {
        currentSection = null;
        currentGroup = null;
      }

      continue;
    }

    if (!currentSection || currentGroup || !line.startsWith("- ")) {
      continue;
    }

    hierarchyErrors.push(
      `${rel}:${index + 1}: source bullets must be nested under a Topic or Showcase heading inside "${currentSection}"`,
    );
  }

  return hierarchyErrors;
}

export function checkDatedMeetupSourceRecordCoverage(rel, meetupContent, sourceRecordContent) {
  const coverageErrors = [];
  const dateMatch = rel.match(/public\/topics\/(\d{4}-\d{2}-\d{2})\.md$/);

  if (!dateMatch) {
    return coverageErrors;
  }

  const meetupUrls = collectUrls(stripFrontmatter(meetupContent));

  if (meetupUrls.size === 0) {
    return coverageErrors;
  }

  if (!sourceRecordContent) {
    coverageErrors.push(
      `${rel}: missing dated source record public/topics/raw/articles/${dateMatch[1]}-link-records.md`,
    );
    return coverageErrors;
  }

  const sourceRecordUrls = collectUrls(sourceRecordContent);

  for (const url of meetupUrls) {
    if (!sourceRecordUrls.has(url)) {
      coverageErrors.push(
        `${rel}: source URL is missing from public/topics/raw/articles/${dateMatch[1]}-link-records.md: ${url}`,
      );
    }
  }

  return coverageErrors;
}

export function checkDatedSourceRecordTopicHeadings(rel, sourceRecordContent, meetupTopicTitles) {
  const headingErrors = [];
  const groupsByTitle = collectSourceRecordTopicGroups(sourceRecordContent);

  for (const group of groupsByTitle.values()) {
    if (!meetupTopicTitles.has(normalizeTopicTitle(group.title))) {
      headingErrors.push(
        `${rel}:${group.line}: source-record group "${group.title}" must match a Topic or Showcase title from the dated Meetup page`,
      );
    }
  }

  return headingErrors;
}

export function checkDatedSourceRecordTopicUrlPlacement(rel, meetupContent, sourceRecordContent) {
  const placementErrors = [];
  const groupsByTitle = collectSourceRecordTopicGroups(sourceRecordContent);

  for (const topicBlock of collectTopicBlocks(meetupContent, "")) {
    const topicUrls = collectUrls(topicBlock.text);

    if (topicUrls.size === 0) {
      continue;
    }

    const sourceRecordGroup = groupsByTitle.get(normalizeTopicTitle(topicBlock.title));

    if (!sourceRecordGroup) {
      placementErrors.push(
        `${rel}: missing source-record group for Topic "${topicBlock.title}"`,
      );
      continue;
    }

    const groupUrls = collectUrls(sourceRecordGroup.text);

    for (const url of topicUrls) {
      if (!groupUrls.has(url)) {
        placementErrors.push(
          `${rel}:${sourceRecordGroup.line}: URL from Topic "${topicBlock.title}" must be under the matching source-record group: ${url}`,
        );
      }
    }
  }

  return placementErrors;
}

export function checkIndexCompleteness(indexRel, indexContent, wikiPages) {
  const indexErrors = [];
  const indexedIds = new Set(collectWikilinks(indexContent).map((link) => normalizeWikiId(link)));

  for (const page of wikiPages) {
    if (page.rel.endsWith("/TEMPLATE.md") || page.rel.endsWith("/templates/TEMPLATE.md")) {
      continue;
    }

    if (!indexTrackedTypes.has(page.type)) {
      continue;
    }

    if (!indexedIds.has(normalizeWikiId(page.title))) {
      indexErrors.push(
        `${indexRel}: missing index entry for ${page.type} page [[${page.title}]] (${page.rel})`,
      );
    }
  }

  return indexErrors;
}

export function checkTopicWikilinkBacklinks(rel, meetupContent, meetupTitle, pagesById) {
  const backlinkErrors = [];

  for (const topicBlock of collectTopicBlocks(meetupContent, meetupTitle)) {
    if (/showcase/i.test(topicBlock.section) || /community slot/i.test(topicBlock.title)) {
      continue;
    }

    for (const link of new Set(collectWikilinks(topicBlock.text))) {
      const targetPage = pagesById.get(normalizeWikiId(link));

      if (!targetPage) {
        continue;
      }

      const body = stripFrontmatter(targetPage.content);

      if (!body.includes(`[[${topicBlock.meetupTitle}]]`) || !body.includes(`**${topicBlock.title}**`)) {
        backlinkErrors.push(
          `${rel}:${topicBlock.line}: Topic wikilink [[${link}]] must have a reciprocal Mentioned In entry for "${topicBlock.title}" in ${targetPage.rel}`,
        );
      }
    }
  }

  return backlinkErrors;
}

export function checkMeetupRelatedPageSpine(
  rel,
  meetupContent,
  meetupTitle = "",
  relatedPagesById = null,
) {
  const relatedErrors = [];
  const relatedLine = meetupContent
    .split("\n")
    .find((line) => line.startsWith("Related wiki pages:"));
  const relatedLinks = collectWikilinks(relatedLine ?? "");
  const relatedIds = new Set(relatedLinks.map((link) => normalizeWikiId(link)));
  const topicLinkIds = new Set();

  for (const topicBlock of collectTopicBlocks(meetupContent, "")) {
    if (/showcase/i.test(topicBlock.section) || /community slot/i.test(topicBlock.title)) {
      continue;
    }

    for (const link of new Set(collectWikilinks(topicBlock.text))) {
      const linkId = normalizeWikiId(link);

      topicLinkIds.add(linkId);

      if (!relatedIds.has(linkId)) {
        relatedErrors.push(
          `${rel}:${topicBlock.line}: Related wiki pages must include [[${link}]] used by Topic "${topicBlock.title}"`,
        );
      }
    }
  }

  if (!meetupTitle || !relatedPagesById) {
    return relatedErrors;
  }

  for (const link of new Set(relatedLinks)) {
    const linkId = normalizeWikiId(link);

    if (standardRelatedPageIds.has(linkId) || topicLinkIds.has(linkId)) {
      continue;
    }

    const relatedPage = relatedPagesById.get(linkId);

    if (!relatedPage) {
      continue;
    }

    if (!stripFrontmatter(relatedPage.content).includes(`[[${meetupTitle}]]`)) {
      relatedErrors.push(
        `${rel}: Related wiki page [[${link}]] must be used by Topic prose or have a Mentioned In entry for [[${meetupTitle}]] in ${relatedPage.rel}`,
      );
    }
  }

  return relatedErrors;
}

/**
 * Fails when the retired club name appears anywhere in a wiki page, including frontmatter.
 * @param {string} rel Repo-relative wiki path
 * @param {string} content Full markdown including frontmatter
 * @returns {string[]}
 */
export function checkRetiredClubName(rel, content) {
  const retiredNameErrors = [];

  for (const [index, line] of String(content ?? "").split("\n").entries()) {
    if (!line.includes(RETIRED_CLUB_NAME)) {
      continue;
    }

    retiredNameErrors.push(
      `${rel}:${index + 1}: retired club name "${RETIRED_CLUB_NAME}" is not allowed in the LLM Wiki`,
    );
  }

  return retiredNameErrors;
}

export function checkMentionedInTopicTitles(rel, body, type) {
  return checkMentionedInTopicReferences(rel, body, type);
}

export function checkMentionedInSourceRecords(rel, body, type, sources, meetupSourceById) {
  if (!["concept", "entity"].includes(type)) {
    return [];
  }

  const sourceRecordErrors = [];
  const sourceSet = new Set(sources);
  const lines = body.split("\n");
  let inMentionedIn = false;

  for (const [index, rawLine] of lines.entries()) {
    const line = rawLine.trimEnd();
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;
      const title = headingMatch[2].trim().toLowerCase();
      inMentionedIn = depth === 2 && title === "mentioned in";
      continue;
    }

    if (!inMentionedIn || !line.trimStart().startsWith("- ")) {
      continue;
    }

    const meetupLinkMatch = line.trimStart().match(/^-\s+\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);

    if (!meetupLinkMatch || !meetupLinkMatch[1].startsWith(MEETUP_WIKILINK_PREFIX)) {
      continue;
    }

    const requiredSource = meetupSourceById.get(stabilizeWikiPageId(meetupLinkMatch[1]));

    if (requiredSource && !sourceSet.has(requiredSource)) {
      sourceRecordErrors.push(
        `${rel}:${index + 1}: Mentioned In meetup ${meetupLinkMatch[1]} requires frontmatter source ${requiredSource}`,
      );
    }
  }

  return sourceRecordErrors;
}

export function checkMentionedInTopicReferences(rel, body, type, meetupTopicTitlesById = null) {
  if (!["concept", "entity"].includes(type)) {
    return [];
  }

  const mentionedInErrors = [];
  const lines = body.split("\n");
  let inMentionedIn = false;

  for (const [index, rawLine] of lines.entries()) {
    const line = rawLine.trimEnd();
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      const depth = headingMatch[1].length;
      const title = headingMatch[2].trim().toLowerCase();
      inMentionedIn = depth === 2 && title === "mentioned in";
      continue;
    }

    if (!inMentionedIn || !line.trimStart().startsWith("- ")) {
      continue;
    }

    const meetupLinkMatch = line.trimStart().match(/^-\s+\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);

    if (!meetupLinkMatch || !meetupLinkMatch[1].startsWith(MEETUP_WIKILINK_PREFIX)) {
      mentionedInErrors.push(
        `${rel}:${index + 1}: Mentioned In bullets for concept/entity pages must start with a meetup wikilink`,
      );
    }

    const topicTitleMatches = [...line.matchAll(/\*\*([^*]+)\*\*/g)];

    if (topicTitleMatches.length === 0) {
      mentionedInErrors.push(
        `${rel}:${index + 1}: Mentioned In bullets for concept/entity pages must include at least one bold exact Topic Title`,
      );
    }

    if (!meetupTopicTitlesById || !meetupLinkMatch) {
      continue;
    }

    const meetupTopicTitles = meetupTopicTitlesById.get(stabilizeWikiPageId(meetupLinkMatch[1]));

    if (!meetupTopicTitles) {
      mentionedInErrors.push(
        `${rel}:${index + 1}: Mentioned In meetup wikilink must point to a dated Meetup page`,
      );
      continue;
    }

    for (const match of topicTitleMatches) {
      const topicTitle = normalizeTopicTitle(match[1]);

      if (!meetupTopicTitles.has(topicTitle)) {
        mentionedInErrors.push(
          `${rel}:${index + 1}: Mentioned In Topic Title "${match[1]}" was not found on ${meetupLinkMatch[1]}`,
        );
      }
    }
  }

  return mentionedInErrors;
}

function collectMeetupTopicTitles(content) {
  const topicTitles = new Set();

  for (const rawLine of stripFrontmatter(content).split("\n")) {
    const topicMatch = rawLine.trim().match(/^-\s+\*\*([^*]+)\*\*/);

    if (topicMatch) {
      topicTitles.add(normalizeTopicTitle(topicMatch[1]));
    }
  }

  return topicTitles;
}

async function main() {
  for (const requiredPath of requiredPaths) {
    const absolutePath = path.join(topicsDir, requiredPath);

    if (!(await pathExists(absolutePath))) {
      errors.push(`missing required wiki path: public/topics/${requiredPath}`);
    }
  }

  for (const meetup of meetups) {
    if (!meetup.markdownHref) {
      errors.push(`${meetup.slug}: missing markdownHref`);
      continue;
    }

    const markdownPath = meetup.markdownHref.replace(/^\.\//, "");
    const absolutePath = path.join(repoRoot, "public", markdownPath);

    if (!(await pathExists(absolutePath))) {
      errors.push(`${meetup.slug}: markdownHref target does not exist: public/${markdownPath}`);
    }
  }

  const markdownFiles = await collectMarkdownFiles(topicsDir);
  const wikiIds = new Set();
  const fileContents = new Map();
  const frontmatterByFile = new Map();
  const meetupTopicTitlesById = new Map();
  const meetupSourceById = new Map();
  const wikiPages = [];
  const entityConceptPagesById = new Map();

  for (const file of markdownFiles) {
    const content = await fs.readFile(file, "utf8");
    const relFromTopics = toPosix(path.relative(topicsDir, file));
    const rel = toPosix(path.relative(repoRoot, file));
    const frontmatter = parseFrontmatter(content);

    fileContents.set(file, content);
    frontmatterByFile.set(file, frontmatter);
    wikiIds.add(normalizeWikiId(relFromTopics));

    if (frontmatter) {
      wikiIds.add(normalizeWikiId(frontmatter.title ?? ""));
      wikiIds.add(stabilizeWikiPageId(frontmatter.title ?? ""));
      wikiPages.push({
        rel,
        title: frontmatter.title ?? "",
        type: frontmatter.type,
      });

      if (frontmatter.type === "meetup" && relFromTopics.match(/^\d{4}-\d{2}-\d{2}\.md$/)) {
        const date = relFromTopics.replace(/\.md$/, "");

        meetupTopicTitlesById.set(
          stabilizeWikiPageId(frontmatter.title ?? ""),
          collectMeetupTopicTitles(content),
        );
        meetupSourceById.set(
          stabilizeWikiPageId(frontmatter.title ?? ""),
          `raw/articles/${date}-link-records.md`,
        );
      }

      if (["entity", "concept"].includes(frontmatter.type)) {
        const page = {
          rel,
          title: frontmatter.title ?? "",
          type: frontmatter.type,
          content,
        };
        entityConceptPagesById.set(normalizeWikiId(frontmatter.title ?? ""), page);
        entityConceptPagesById.set(normalizeWikiId(relFromTopics), page);
      }
    }
  }

  const indexPath = path.join(topicsDir, "index.md");
  const indexContent = fileContents.get(indexPath);

  if (indexContent) {
    errors.push(...checkIndexCompleteness("public/topics/index.md", indexContent, wikiPages));
  }

  for (const [file, content] of fileContents) {
    const frontmatter = frontmatterByFile.get(file);

    if (frontmatter) {
      checkFrontmatter(file, frontmatter);
      const rel = toPosix(path.relative(repoRoot, file));
      errors.push(
        ...checkMentionedInTopicReferences(rel, content, frontmatter.type, meetupTopicTitlesById),
        ...checkMentionedInSourceRecords(
          rel,
          content,
          frontmatter.type,
          parseInlineArray(frontmatter.sources),
          meetupSourceById,
        ),
      );
    }
  }

  for (const [file, content] of fileContents) {
    const rel = toPosix(path.relative(repoRoot, file));

    errors.push(...checkRetiredClubName(rel, content));

    for (const link of collectWikilinks(content)) {
      if (!wikiIds.has(stabilizeWikiPageId(link)) && !wikiIds.has(normalizeWikiId(link))) {
        errors.push(`${rel}: unresolved wikilink [[${link}]]`);
      }
    }
  }

  for (const [file, content] of fileContents) {
    const rel = toPosix(path.relative(repoRoot, file));
    const dateMatch = rel.match(/^public\/topics\/(\d{4}-\d{2}-\d{2})\.md$/);

    if (!dateMatch) {
      continue;
    }

    const sourceRecordPath = path.join(
      topicsDir,
      "raw",
      "articles",
      `${dateMatch[1]}-link-records.md`,
    );

    const frontmatter = frontmatterByFile.get(file);

    errors.push(
      ...checkDatedMeetupSourceRecordCoverage(rel, content, fileContents.get(sourceRecordPath)),
      ...checkMeetupRelatedPageSpine(
        rel,
        content,
        frontmatter?.title ?? "",
        entityConceptPagesById,
      ),
    );

    const sourceRecordContent = fileContents.get(sourceRecordPath);

    if (sourceRecordContent) {
      const sourceRecordRel = toPosix(path.relative(repoRoot, sourceRecordPath));
      errors.push(
        ...checkDatedSourceRecordTopicHeadings(
          sourceRecordRel,
          sourceRecordContent,
          collectMeetupTopicTitles(content),
        ),
        ...checkDatedSourceRecordTopicUrlPlacement(
          sourceRecordRel,
          content,
          sourceRecordContent,
        ),
      );
    }

    if (frontmatter?.title) {
      errors.push(
        ...checkTopicWikilinkBacklinks(
          rel,
          content,
          frontmatter.title,
          entityConceptPagesById,
        ),
      );
    }
  }

  await checkRawRecords();

  if (errors.length) {
    console.error("Wiki lint failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Wiki lint passed (${markdownFiles.length} markdown files checked).`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
