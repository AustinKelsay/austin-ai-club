/**
 * Sync Models & Research sections in dated meetup Markdown from Meetup Data,
 * and rewrite Mentions In lines that still cite pre-roundup Topic titles.
 *
 * Usage: node scripts/sync-models-roundup-markdown.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { meetups } from "../src/data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const topicsDir = path.join(root, "public/topics");

/**
 * Meetup-scoped old Topic title → official roundup title.
 * Keys are meetup display dates matching Mentions wikilinks.
 */
const MEETUP_TITLE_MAPS = {
  "July 22, 2026": {
    "Open agent and reasoning models fan out": "Open model releases",
    "Open multimodal models specialize by modality": "Open model releases",
    "Embedding models get their own open release lane": "Open model releases",
    "Local model packaging becomes part of the release": "Open model releases",
  },
  "July 8, 2026": {
    "Proprietary releases split across agents and media": "Closed model releases",
    "Open model releases get specialized fast": "Open model releases",
  },
  "June 24, 2026": {
    "Closed model releases are a quiet week": "Closed model releases",
    "Open models are eating the frontier gap": "Open model releases",
  },
  "June 10, 2026": {
    "Closed labs start the June model wave": "Closed model releases",
    "Open-weight release week turns into a firehose": "Open model releases",
  },
  "May 27, 2026": {
    "PrismML ships 1-bit image gen that runs on iPhone": "Open model releases",
    "Epicure squeezes global cooking into 2MB": "Open model releases",
  },
  "May 13, 2026": {
    "GPT Image 2 gets UI-ish": "Closed model releases",
    "SubQ goes after 12M-token context": "Closed model releases",
    "Qwen3.6-27B gets laptop-shaped": "Open model releases",
    "Gemma 4 app surface": "Open model releases",
  },
  "April 15, 2026": {
    "Qwen3.6-Plus": "Closed model releases",
    "Meta introduces Muse Spark": "Closed model releases",
    "Waypoint-1.5 brings real-time AI worlds to everyday GPUs": "Open model releases",
    "GLM-5.1": "Open model releases",
    "Trinity-Large-Thinking": "Open model releases",
    "Google Gemma 4": "Open model releases",
    "Llama 4 Scout & Maverick": "Open model releases",
  },
  "April 1, 2026": {
    "GLM-5.1": "Closed model releases",
    "GLM-5V-Turbo": "Closed model releases",
    "MiniMax M2.7": "Closed model releases",
    "GPT-5.4 mini and nano": "Closed model releases",
    "GLM5 Turbo": "Closed model releases",
    "Chroma Context-1": "Open model releases",
    "Nemotron-Cascade 2": "Open model releases",
    "Holo3 computer-use models": "Open model releases",
    "Qwen3.5-Omni": "Open model releases",
    "Cohere Transcribe": "Open model releases",
    "Liquid AI LFM2.5-350M": "Open model releases",
    "Claude-distilled Qwen models trending on HF": "Open model releases",
  },
  "March 18, 2026": {
    "GPT-5.4 mini": "Closed model releases",
    "Xiaomi MiMo-V2-Pro": "Closed model releases",
    "MiniMax M2.7": "Closed model releases",
    "Qwen 3.5 series": "Open model releases",
    "Nemotron v3 series": "Open model releases",
    "Nemotron 3 VoiceChat frontier": "Open model releases",
    "Mistral Small": "Open model releases",
  },
};

/**
 * Classifies a link label for board Markdown.
 * @param {string} href URL
 * @returns {"Post" | "Repo" | "Source"}
 */
function linkLabel(href) {
  if (/x\.com|twitter\.com/i.test(href)) return "Post";
  if (/github\.com/i.test(href)) return "Repo";
  return "Source";
}

/**
 * Renders one Models Topic as board Markdown.
 * @param {object} item Meetup Data Topic
 * @returns {string}
 */
function renderTopic(item) {
  const lines = [`- **${item.title}** - ${item.description}`];
  const urls = [];
  const seen = new Set();
  const push = (href) => {
    if (!href || seen.has(href)) return;
    seen.add(href);
    urls.push(href);
  };
  push(item.href);
  for (const embed of item.embeds ?? []) push(embed.href);
  if (item.embed) push(item.embed.href);
  for (const href of item.linkPair ?? []) push(href);

  for (const href of urls) {
    // Prefer clean x.com posts in Markdown Archive.
    const clean = href
      .replace(/^https:\/\/twitter\.com\//, "https://x.com/")
      .replace(/\?ref_src=twsrc%5Etfw$/, "");
    lines.push(`  ${linkLabel(clean)}: ${clean}`);
  }
  return lines.join("\n");
}

/**
 * Replaces the Models & Research section body in a meetup Markdown file.
 * @param {string} markdown File contents
 * @param {object[]} items Models Topics
 * @returns {string}
 */
function replaceModelsSection(markdown, items) {
  const heading = "### Models & Research";
  const start = markdown.indexOf(heading);
  if (start < 0) throw new Error("Models & Research heading missing");

  const after = start + heading.length;
  const nextHeading = markdown.slice(after).search(/\n### /);
  const end = nextHeading < 0 ? markdown.length : after + nextHeading;

  const body = `\n${items.map(renderTopic).join("\n\n")}\n`;
  return `${markdown.slice(0, after)}${body}${markdown.slice(end)}`;
}

/**
 * Rewrites a Mentions bullet's bold Topic titles through meetup-scoped maps and dedupes.
 * @param {string} line Mentions line
 * @returns {string}
 */
function rewriteMentionsLine(line) {
  if (!line.includes("**")) return line;
  const meetupMatch = line.match(/\[\[Sovereign AI Club - ([^\]]+)\]\]/);
  if (!meetupMatch) return line;
  const titleMap = MEETUP_TITLE_MAPS[meetupMatch[1]];
  if (!titleMap) return line;

  let next = line;
  for (const [from, to] of Object.entries(titleMap)) {
    next = next.split(`**${from}**`).join(`**${to}**`);
  }

  next = next.replace(
    /(:\s*)((?:\*\*[^*]+\*\*(?:,\s*|\s+and\s+)?)+)(\.?)$/,
    (match, prefix, _titles, suffix) => {
      const found = [...match.matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1]);
      const unique = [];
      for (const title of found) {
        if (!unique.includes(title)) unique.push(title);
      }
      if (unique.length === found.length) return match;
      let nice;
      if (unique.length === 1) nice = `**${unique[0]}**`;
      else if (unique.length === 2) nice = `**${unique[0]}** and **${unique[1]}**`;
      else {
        nice = `${unique
          .slice(0, -1)
          .map((t) => `**${t}**`)
          .join(", ")}, and **${unique[unique.length - 1]}**`;
      }
      return `${prefix}${nice}${suffix || "."}`;
    },
  );
  return next;
}

let meetupUpdates = 0;
for (const meetup of meetups) {
  if (meetup.id === "meetup-2026-08-05") continue; // already authored in roundup form
  const models = meetup.tracks.find((track) => track.title === "Models & Research");
  if (!models) continue;
  const mdPath = path.join(topicsDir, `${meetup.slug}.md`);
  if (!fs.existsSync(mdPath)) {
    console.warn("missing markdown", mdPath);
    continue;
  }
  const before = fs.readFileSync(mdPath, "utf8");
  const after = replaceModelsSection(before, models.items);
  if (after !== before) {
    // Bump updated date in frontmatter when present.
    const stamped = after.replace(
      /^updated: \d{4}-\d{2}-\d{2}$/m,
      "updated: 2026-08-04",
    );
    fs.writeFileSync(mdPath, stamped);
    meetupUpdates++;
    console.log("updated meetup board", meetup.slug);
  }
}

let mentionFiles = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "raw") continue;
      walk(full);
      continue;
    }
    if (!entry.name.endsWith(".md")) continue;
    if (/^\d{4}-\d{2}-\d{2}\.md$/.test(entry.name)) continue;
    const before = fs.readFileSync(full, "utf8");
    if (!before.includes("## Mentioned In")) continue;
    const after = before
      .split("\n")
      .map((line) => (line.trimStart().startsWith("- [[Sovereign AI Club") ? rewriteMentionsLine(line) : line))
      .join("\n");
    if (after !== before) {
      fs.writeFileSync(full, after);
      mentionFiles++;
      console.log("updated mentions", path.relative(root, full));
    }
  }
}
walk(topicsDir);

console.log(`\nMeetup boards updated: ${meetupUpdates}`);
console.log(`Mention files updated: ${mentionFiles}`);
