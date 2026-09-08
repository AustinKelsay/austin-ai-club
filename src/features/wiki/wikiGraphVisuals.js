import { readThemeToken } from "./themeTokens.js";

export const BASE_NODE_VAL = 2.5;
export const SELECTED_NODE_VAL = 5.5;
export const MAX_NODE_VAL = 7.5;
export const MAX_NEIGHBOR_NODE_VAL = 5.2;
export const DEGREE_VAL_MULTIPLIER = 0.18;
export const NEIGHBOR_NODE_ALPHA = 1;
export const NON_NEIGHBOR_NODE_ALPHA = 0.16;
export const DEFAULT_LABEL_DEGREE_THRESHOLD = 8;

/*
 * Colors are read after the stylesheet loads and cached for the single palette.
 */
const LINK_COLOR_TOKENS = {
  topic: {
    idle: "--graph-topic-link",
    selected: "--graph-topic-link-selected",
    dim: "--graph-topic-link-dim",
  },
  wiki: {
    idle: "--graph-wiki-link",
    selected: "--graph-wiki-link-selected",
    dim: "--graph-wiki-link-dim",
  },
};

export function getNodeVal(node, selectedId, neighborIds = new Set()) {
  if (node.id === selectedId) {
    return SELECTED_NODE_VAL;
  }

  const degree = node.degree ?? 0;
  if (isNeighborNode(node, selectedId, neighborIds)) {
    return Math.min(
      MAX_NEIGHBOR_NODE_VAL,
      BASE_NODE_VAL + 1.2 + degree * (DEGREE_VAL_MULTIPLIER * 0.5),
    );
  }

  return Math.min(MAX_NODE_VAL, BASE_NODE_VAL + degree * DEGREE_VAL_MULTIPLIER);
}

export function isSelectedNode(node, selectedId) {
  return node.id === selectedId;
}

export function isNeighborNode(node, selectedId, neighborIds) {
  return selectedId != null && node.id !== selectedId && neighborIds.has(node.id);
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function withAlpha(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function getNodeColor(node, selectedId, typeColors = {}, neighborIds = new Set()) {
  if (isSelectedNode(node, selectedId)) {
    return readThemeToken("--graph-node-selected");
  }

  const baseColor = typeColors[node.type] ?? readThemeToken("--graph-node-default");

  if (selectedId == null) {
    return withAlpha(baseColor, NEIGHBOR_NODE_ALPHA);
  }

  const alpha = isNeighborNode(node, selectedId, neighborIds)
    ? NEIGHBOR_NODE_ALPHA
    : NON_NEIGHBOR_NODE_ALPHA;
  return withAlpha(baseColor, alpha);
}

export function isNeighborLink(link, selectedId, neighborIds) {
  if (selectedId == null) {
    return false;
  }

  const sourceId = typeof link.source === "object" ? link.source.id : link.source;
  const targetId = typeof link.target === "object" ? link.target.id : link.target;

  return (
    (sourceId === selectedId && neighborIds.has(targetId)) ||
    (targetId === selectedId && neighborIds.has(sourceId))
  );
}

export function buildNeighborIds(links, selectedId) {
  const neighbors = new Set();

  if (selectedId == null) {
    return neighbors;
  }

  for (const link of links) {
    const sourceId = typeof link.source === "object" ? link.source.id : link.source;
    const targetId = typeof link.target === "object" ? link.target.id : link.target;

    if (sourceId === selectedId) {
      neighbors.add(targetId);
    } else if (targetId === selectedId) {
      neighbors.add(sourceId);
    }
  }

  return neighbors;
}

export function getLinkColor(link, selectedId = null, neighborIds = new Set()) {
  const tokens = link.kind === "topic" ? LINK_COLOR_TOKENS.topic : LINK_COLOR_TOKENS.wiki;

  if (selectedId == null) {
    return readThemeToken(tokens.idle);
  }

  if (isNeighborLink(link, selectedId, neighborIds)) {
    return readThemeToken(tokens.selected);
  }

  return readThemeToken(tokens.dim);
}

export function getLinkWidth(link, selectedId = null, neighborIds = new Set()) {
  const base = link.kind === "topic" ? 1 : 0.5;

  if (selectedId != null && isNeighborLink(link, selectedId, neighborIds)) {
    return base * 2.2;
  }

  return base;
}

export function getLinkParticleCount(link, selectedId = null, neighborIds = new Set()) {
  if (selectedId != null && !isNeighborLink(link, selectedId, neighborIds)) {
    return 0;
  }

  return link.kind === "topic" ? 1 : 0;
}

export function shouldShowNodeLabel(
  node,
  selectedId,
  neighborIdsOrThreshold = new Set(),
  degreeThreshold = DEFAULT_LABEL_DEGREE_THRESHOLD,
) {
  const neighborIds =
    neighborIdsOrThreshold instanceof Set ? neighborIdsOrThreshold : new Set();
  const threshold =
    typeof neighborIdsOrThreshold === "number" ? neighborIdsOrThreshold : degreeThreshold;

  if (isSelectedNode(node, selectedId)) {
    return true;
  }

  if (selectedId != null) {
    return neighborIds.has(node.id);
  }

  return (node.degree ?? 0) >= threshold;
}

function getTruncatedLabel(value, maxLength = 34) {
  const label = String(value ?? "");

  if (label.length <= maxLength) {
    return label;
  }

  return `${label.slice(0, maxLength - 3).trimEnd()}...`;
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

export function drawNodeLabel(ctx, node, color, globalScale = 1) {
  const label = getTruncatedLabel(node.label);
  if (!label) {
    return;
  }

  const fontSize = Math.max(8, 10 / globalScale);
  ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const radius = (node.val ?? BASE_NODE_VAL) * 1.6;
  const y = node.y + radius + fontSize * 0.9;
  const metrics = ctx.measureText(label);
  const paddingX = Math.max(4, 5 / globalScale);
  const paddingY = Math.max(2, 3 / globalScale);
  const width = metrics.width + paddingX * 2;
  const height = fontSize + paddingY * 2;
  const x = node.x - width / 2;

  ctx.fillStyle = readThemeToken("--graph-label-bg");
  drawRoundedRect(ctx, x, y - height / 2, width, height, Math.max(4, 5 / globalScale));
  ctx.fill();
  ctx.fillStyle = color;
  ctx.fillText(label, node.x, y);
}

function escapeTooltipText(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });
}

export function buildNodeTooltip(node) {
  const degree = node.degree ?? 0;
  const type = (node.type ?? "page").replace(/-/g, " ");
  const label = escapeTooltipText(node.label ?? "");
  const typeText = escapeTooltipText(type);
  const linksLabel = degree === 1 ? "link" : "links";

  return `<div class="wiki-graph-tooltip"><strong>${label}</strong><span>${typeText} \u00b7 ${degree} ${linksLabel}</span></div>`;
}
