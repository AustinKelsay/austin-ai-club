/**
 * Interactive force-directed wiki link graph.
 * Defers the initial camera fit until the simulation settles with real node coordinates,
 * and never auto-refocuses on resize (Focus / All remain manual).
 */
import { useModalFocus } from "../../lib/useModalFocus.js";
import ForceGraph from "force-graph";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getDefaultVisibleTypes,
  isLinkVisible,
} from "./wikiGraphFilters.js";
import { updateLatestValueRef } from "./WikiGraphController.js";
import { getWikiGraphTypeColors } from "./wikiGraphTypes.js";
import {
  buildNeighborIds,
  buildNodeTooltip,
  drawNodeLabel,
  getLinkColor,
  getLinkParticleCount,
  getLinkWidth,
  getNodeColor,
  getNodeVal,
  shouldShowNodeLabel,
} from "./wikiGraphVisuals.js";

const FIT_PADDING = 120;
const SMALL_FOCUS_NODE_LIMIT = 6;
const TINY_FOCUS_ZOOM = 1.2;
const SMALL_FOCUS_ZOOM = 1.45;

function getMotionDuration(duration) {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : duration;
}

/**
 * Fits the camera to nodes matching `nodeFilter`.
 * @param {object} instance ForceGraph instance
 * @param {number} [duration=450] Animation duration in ms
 * @param {(node: object) => boolean} [nodeFilter] Optional node predicate
 */
function focusGraph(instance, duration = 450, nodeFilter) {
  instance.zoomToFit(getMotionDuration(duration), FIT_PADDING, nodeFilter);
}

/**
 * Builds a predicate for the selected neighborhood (or all visible types).
 * @param {string | null} selectedId Currently selected page id
 * @param {Set<string>} neighborIds Neighbor page ids
 * @param {Set<string>} visibleTypes Visible graph type set
 * @returns {(node: object) => boolean}
 */
function buildFocusNodeFilter(selectedId, neighborIds, visibleTypes) {
  if (!selectedId) {
    return (node) => visibleTypes.has(node.type);
  }

  return (node) =>
    visibleTypes.has(node.type) && (node.id === selectedId || neighborIds.has(node.id));
}

/**
 * Returns true when the graph has visible nodes with settled x/y coordinates.
 * @param {object} instance ForceGraph instance
 * @param {Set<string>} visibleTypes Visible graph type set
 * @returns {boolean}
 */
function hasSettledVisibleNodes(instance, visibleTypes) {
  const nodes = instance.graphData()?.nodes ?? [];
  if (nodes.length === 0) {
    return false;
  }

  return nodes.some(
    (node) => visibleTypes.has(node.type) && node.x != null && node.y != null,
  );
}

/**
 * Centers on a small neighborhood or zoom-to-fits the focus set.
 * Never centers on a selected node that is hidden by the type legend.
 * @param {object} instance ForceGraph instance
 * @param {string | null} selectedId Currently selected page id
 * @param {Set<string>} neighborIds Neighbor page ids
 * @param {Set<string>} visibleTypes Visible graph type set
 * @param {number} [duration=450] Animation duration in ms
 */
function focusNeighborhood(instance, selectedId, neighborIds, visibleTypes, duration = 450) {
  duration = getMotionDuration(duration);
  const nodeFilter = buildFocusNodeFilter(selectedId, neighborIds, visibleTypes);
  const graphData = instance.graphData();
  const focusNodes = graphData.nodes.filter(nodeFilter);
  const selectedNode = selectedId
    ? graphData.nodes.find((node) => node.id === selectedId)
    : null;
  const selectedIsVisible = Boolean(selectedNode && visibleTypes.has(selectedNode.type));

  if (focusNodes.length === 0) {
    focusGraph(instance, duration, (node) => visibleTypes.has(node.type));
    return;
  }

  if (selectedIsVisible && focusNodes.length <= SMALL_FOCUS_NODE_LIMIT) {
    if (selectedNode.x != null && selectedNode.y != null) {
      instance.centerAt(selectedNode.x, selectedNode.y, duration);
      instance.zoom(focusNodes.length <= 2 ? TINY_FOCUS_ZOOM : SMALL_FOCUS_ZOOM, duration);
      return;
    }
  }

  focusGraph(instance, duration, nodeFilter);
}

/**
 * Renders the wiki force graph with Focus / All / Full screen controls.
 * @param {{ graph: { nodes: object[], links: object[] }, selectedId: string | null, onSelectPage: (id: string) => void, visibleTypes?: Set<string> }} props
 */
export default function WikiGraph({ graph, selectedId, onSelectPage, visibleTypes = getDefaultVisibleTypes() }) {
  const frameRef = useRef(null);
  const containerRef = useRef(null);
  const graphRef = useRef(null);
  const resizeGraphRef = useRef(null);
  const onSelectPageRef = useRef(onSelectPage);
  const visibleTypesRef = useRef(visibleTypes);
  const selectedIdRef = useRef(selectedId);
  const neighborIdsRef = useRef(new Set());
  const visibleNodeIdsRef = useRef(new Set());
  const hasSettledFitRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const typeColors = useMemo(() => getWikiGraphTypeColors(), []);
  useModalFocus(frameRef, isFullscreen, () => setIsFullscreen(false));

  const graphData = useMemo(() => {
    const nodes = graph.nodes
      .filter((node) => visibleTypes.has(node.type))
      .map((node) => ({ ...node }));
    const visibleIds = new Set(nodes.map((node) => node.id));
    const links = graph.links
      .filter((link) => isLinkVisible(link, visibleIds))
      .map((link) => ({ ...link }));

    return { nodes, links };
  }, [graph, visibleTypes]);

  const neighborIds = useMemo(
    () => buildNeighborIds(graphData.links, selectedId),
    [graphData.links, selectedId],
  );

  const visibleNodeIds = useMemo(
    () => new Set(graphData.nodes.map((node) => node.id)),
    [graphData.nodes],
  );

  useEffect(() => {
    updateLatestValueRef(onSelectPageRef, onSelectPage);
  }, [onSelectPage]);

  useEffect(() => {
    visibleTypesRef.current = visibleTypes;
  }, [visibleTypes]);

  useEffect(() => {
    selectedIdRef.current = selectedId;
    neighborIdsRef.current = neighborIds;
  }, [selectedId, neighborIds]);

  useEffect(() => {
    visibleNodeIdsRef.current = visibleNodeIds;
  }, [visibleNodeIds]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      reducedMotionRef.current = preference.matches;
      graphRef.current?.linkDirectionalParticles((link) =>
        reducedMotionRef.current ? 0 :
          getLinkParticleCount(link, selectedIdRef.current, neighborIdsRef.current),
      );
    };
    syncMotion();
    preference.addEventListener("change", syncMotion);
    return () => preference.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const instance = ForceGraph()(containerRef.current)
      .backgroundColor("rgba(0,0,0,0)")
      .nodeId("id")
      .nodeLabel((node) => buildNodeTooltip(node))
      .nodeRelSize(3.4)
      .nodeVal((node) => getNodeVal(node, selectedIdRef.current, neighborIdsRef.current))
      .nodeVisibility((node) => visibleTypesRef.current.has(node.type))
      .linkVisibility((link) => isLinkVisible(link, visibleNodeIdsRef.current))
      .nodeColor((node) =>
        getNodeColor(node, selectedIdRef.current, typeColors, neighborIdsRef.current),
      )
      .nodeCanvasObject((node, ctx, globalScale) => {
        if (shouldShowNodeLabel(node, selectedIdRef.current, neighborIdsRef.current)) {
          drawNodeLabel(ctx, node, getNodeColor(node, selectedIdRef.current, typeColors, neighborIdsRef.current), globalScale);
        }
      })
      .nodeCanvasObjectMode(() => "after")
      .linkColor((link) =>
        getLinkColor(link, selectedIdRef.current, neighborIdsRef.current),
      )
      .linkWidth((link) =>
        getLinkWidth(link, selectedIdRef.current, neighborIdsRef.current),
      )
      .linkDirectionalParticles((link) =>
        reducedMotionRef.current ? 0 :
          getLinkParticleCount(link, selectedIdRef.current, neighborIdsRef.current),
      )
      .linkDirectionalParticleWidth(1.4)
      .linkDirectionalParticleSpeed(0.004)
      .cooldownTicks(110)
      .enableZoomInteraction(true)
      .enablePanInteraction(true)
      .onEngineStop(() => {
        if (hasSettledFitRef.current) {
          return;
        }

        if (!hasSettledVisibleNodes(instance, visibleTypesRef.current)) {
          return;
        }

        focusNeighborhood(
          instance,
          selectedIdRef.current,
          neighborIdsRef.current,
          visibleTypesRef.current,
          0,
        );
        hasSettledFitRef.current = true;
      })
      .onNodeClick((node) => onSelectPageRef.current(node.id));

    instance.d3Force("charge")?.strength(-95);
    instance.d3Force("link")?.distance((link) => (link.kind === "topic" ? 92 : 64));

    graphRef.current = instance;

    /** Resize the canvas only — never auto-refocus the camera. */
    const resize = () => {
      if (!containerRef.current) {
        return;
      }

      const bounds = containerRef.current.getBoundingClientRect();
      instance.width(Math.max(280, bounds.width));
      instance.height(Math.max(280, bounds.height));
    };
    resizeGraphRef.current = resize;

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(containerRef.current);
    window.addEventListener("resize", resize);
    resize();
    const animationFrame = window.requestAnimationFrame(resize);
    const settledResize = window.setTimeout(resize, 250);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settledResize);
      window.removeEventListener("resize", resize);
      resizeObserver.disconnect();
      instance.pauseAnimation();
      instance.graphData({ nodes: [], links: [] });
      resizeGraphRef.current = null;
      graphRef.current = null;
      hasSettledFitRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      return undefined;
    }

    const animationFrame = window.requestAnimationFrame(() => resizeGraphRef.current?.());
    const settledResize = window.setTimeout(() => resizeGraphRef.current?.(), 180);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(settledResize);
      window.setTimeout(() => resizeGraphRef.current?.(), 80);
    };
  }, [isFullscreen]);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }

    hasSettledFitRef.current = false;
    graphRef.current.graphData(graphData);
  }, [graphData]);

  useEffect(() => {
    if (!graphRef.current) {
      return;
    }

    graphRef.current
      .nodeVal((node) => getNodeVal(node, selectedId, neighborIds))
      .nodeVisibility((node) => visibleTypesRef.current.has(node.type))
      .linkVisibility((link) => isLinkVisible(link, visibleNodeIdsRef.current))
      .nodeColor((node) =>
        getNodeColor(node, selectedId, typeColors, neighborIds),
      )
      .linkColor((link) => getLinkColor(link, selectedId, neighborIds))
      .linkWidth((link) => getLinkWidth(link, selectedId, neighborIds))
      .linkDirectionalParticles((link) =>
        reducedMotionRef.current ? 0 : getLinkParticleCount(link, selectedId, neighborIds),
      );

    if (!hasSettledFitRef.current) {
      return;
    }

    if (!hasSettledVisibleNodes(graphRef.current, visibleTypesRef.current)) {
      return;
    }

    focusNeighborhood(graphRef.current, selectedId, neighborIds, visibleTypesRef.current, 450);
  }, [selectedId, neighborIds, visibleTypes, graphData.nodes]);

  const frameClassName = [
    "wiki-graph-frame",
    isFullscreen ? "wiki-graph-frame--fullscreen" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={frameRef}
      tabIndex={isFullscreen ? -1 : undefined}
      className={frameClassName}
      role={isFullscreen ? "dialog" : undefined}
      aria-modal={isFullscreen ? "true" : undefined}
      aria-label={isFullscreen ? "Fullscreen wiki graph" : undefined}
    >
      <div className="wiki-graph-status-row">
        <div className="wiki-graph-fit-controls">
          <button
            type="button"
            aria-label="Fit selected graph neighborhood"
            onClick={() =>
              graphRef.current
                ? focusNeighborhood(graphRef.current, selectedId, neighborIds, visibleTypes, 350)
                : null
            }
          >
            Focus
          </button>
          <button
            type="button"
            aria-label="Fit all visible graph nodes"
            onClick={() =>
              graphRef.current
                ? focusGraph(graphRef.current, 350, (node) => visibleTypes.has(node.type))
                : null
            }
          >
            All
          </button>
          <button
            type="button"
            aria-label={isFullscreen ? "Close fullscreen graph" : "Open fullscreen graph"}
            aria-pressed={isFullscreen}
            onClick={() => setIsFullscreen((current) => !current)}
          >
            {isFullscreen ? "Close" : "Full screen"}
          </button>
        </div>
      </div>
      <div ref={containerRef} className="wiki-graph-canvas" role="img" aria-label="Wiki link graph" />
    </div>
  );
}
