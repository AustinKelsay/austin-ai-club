import { WIKI_GRAPH_TYPES } from "./wikiGraphTypes.js";
import { getDefaultVisibleTypes } from "./wikiGraphFilters.js";

export function WikiGraphLegend({ visibleTypes = getDefaultVisibleTypes(), onToggle }) {
  return (
    <div className="wiki-graph-legend" aria-label="Graph node types">
      {WIKI_GRAPH_TYPES.map((graphType) => {
        const visible = visibleTypes.has(graphType.type);
        const className = `wiki-graph-legend-item wiki-graph-legend-item--${
          visible ? "on" : "off"
        }`;

        return (
          <button
            key={graphType.type}
            type="button"
            className={className}
            data-type={graphType.type}
            aria-pressed={visible}
            onClick={onToggle ? () => onToggle(graphType.type) : undefined}
            aria-label={`Toggle ${graphType.label} nodes`}
          >
            <span
              className="wiki-graph-legend-dot"
              style={{ backgroundColor: graphType.cssColor }}
              aria-hidden="true"
            />
            {graphType.label}
          </button>
        );
      })}
    </div>
  );
}
