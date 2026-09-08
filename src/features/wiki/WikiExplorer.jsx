import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildWikiExplorerSearch,
  buildWikiPath,
  parseWikiExplorerSearch,
  WIKI_EXPLORER_SORT_DEFAULT,
  WIKI_EXPLORER_TYPE_ALL,
} from "../../app/routes.js";
import RouteLink from "../../components/RouteLink.jsx";
import ArchiveShell from "../archive/ArchiveShell.jsx";
import { groupPagesByType } from "./wikiCatalogGroups.js";
import { getDefaultVisibleTypes, resolveGraphFocusId, toggleVisibleType, WIKI_GRAPH_TYPE_LIST } from "./wikiGraphFilters.js";
import { WikiDetail } from "./WikiDetail.jsx";
import WikiGraphView from "./WikiGraphView.jsx";
import { WikiGraphLegend } from "./WikiGraphLegend.jsx";
import { WIKI_GRAPH_TYPES } from "./wikiGraphTypes.js";
import { filterTopicsByExplorerState, getSelectedTopicFilterIds } from "./wikiTopicFilters.js";
import { WikiTopicResults, WikiTopicSpotlight } from "./WikiTopicResults.jsx";
import { filterPagesByQuery } from "./wikiSearch.js";
import { pickRandomPage } from "./wikiSurprise.js";

const TYPE_LABEL_OVERRIDES = {
  meetup: "Meetups",
  entity: "Entities",
  concept: "Concepts",
  comparison: "Comparisons",
  query: "Queries",
  summary: "Source records",
};

function getGroupLabel(type) {
  return TYPE_LABEL_OVERRIDES[type] ?? getPageTypeLabel(type);
}

const ALL = WIKI_EXPLORER_TYPE_ALL;
const SEARCH_INPUT_KEY = "/";

function getPageTypeLabel(type) {
  return type.replace(/-/g, " ");
}

function getCatalogMetric(page) {
  const sourceLinkCount = page.sourceLinks?.length ?? 0;

  if (sourceLinkCount > 0) {
    return { count: sourceLinkCount, label: "links" };
  }

  const relationCount = page.outgoingIds.length + page.backlinkIds.length;

  if (relationCount > 0) {
    return { count: relationCount, label: "refs" };
  }

  return null;
}

function getPageDegree(page) {
  return page.outgoingIds.length + page.backlinkIds.length;
}

/**
 * Picks a sensible default wiki page for first load.
 * Prefers on-graph types (especially meetups) over source records, which are
 * hidden from the force-graph legend.
 * @param {Array<{ type: string }>} pages
 * @returns {object | null}
 */
function getDefaultWikiPage(pages) {
  const graphTypes = new Set(WIKI_GRAPH_TYPE_LIST);

  return (
    pages.find((page) => page.type === "meetup") ??
    pages.find((page) => graphTypes.has(page.type)) ??
    pages[0] ??
    null
  );
}

function sortPages(pages, sort) {
  const copy = [...pages];

  if (sort === "updated") {
    copy.sort((a, b) => {
      const dateDiff = (b.updated || "").localeCompare(a.updated || "");
      return dateDiff || a.title.localeCompare(b.title);
    });
    return copy;
  }

  if (sort === "connections") {
    copy.sort((a, b) => {
      const diff = getPageDegree(b) - getPageDegree(a);
      return diff || a.title.localeCompare(b.title);
    });
    return copy;
  }

  if (sort === "sources") {
    copy.sort((a, b) => {
      const diff = (b.sourceLinks?.length ?? 0) - (a.sourceLinks?.length ?? 0);
      return diff || a.title.localeCompare(b.title);
    });
    return copy;
  }

  copy.sort((a, b) => a.title.localeCompare(b.title));
  return copy;
}

function WikiLoading({ onOpenRoute, error, onRetry }) {
  return (
    <ArchiveShell onOpenRoute={onOpenRoute} shellClassName="shell--wiki" activePath="/wiki">
      <main id="main-content" tabIndex={-1} className="wiki-shell">
        <section className="wiki-loading">
          <h2>{error ? "The Wiki couldn’t load." : "Loading wiki…"}</h2>
          {error ? <>
            <p>Check your connection and try again.</p>
            <button className="wiki-retry" onClick={onRetry}>Try again</button>
          </> : <p role="status">Gathering pages and connections.</p>}
        </section>
      </main>
    </ArchiveShell>
  );
}


function WikiCatalogItem({ page, selected, onOpenRoute }) {
  const metric = getCatalogMetric(page);

  return (
    <RouteLink
      to={buildWikiPath(page.id)}
      onOpenRoute={onOpenRoute}
      className={`wiki-catalog-item ${selected ? "wiki-catalog-item--selected" : ""}`}
      aria-label={`Open ${page.title} wiki page`}
    >
      <span className="wiki-catalog-item-copy">
        <strong>{page.title}</strong>
      </span>
      {metric ? (
        <span
          className="wiki-catalog-counts"
          aria-label={`${metric.count} ${metric.label}`}
        >
          <strong>{metric.count}</strong>
          <small>{metric.label}</small>
        </span>
      ) : null}
    </RouteLink>
  );
}

function getCatalogTypeCounts(pages) {
  const counts = new Map([[ALL, pages.length]]);

  for (const page of pages) {
    counts.set(page.type, (counts.get(page.type) ?? 0) + 1);
  }

  return counts;
}

function WikiIndexTabs({ pageTypes, activeType, pages, onSelectType }) {
  const counts = getCatalogTypeCounts(pages);

  return (
    <div className="wiki-index-tabs" role="tablist" aria-label="Browse wiki page types">
      {pageTypes.map((type) => {
        const isActive = type === activeType;
        const label = type === ALL ? "All" : getGroupLabel(type);

        return (
          <button
            key={type}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`wiki-index-tab ${isActive ? "wiki-index-tab--active" : ""}`}
            onClick={() => onSelectType(type)}
          >
            <span>{label}</span>
            <strong>{counts.get(type) ?? 0}</strong>
          </button>
        );
      })}
    </div>
  );
}

function WikiCatalogSection({ group, selectedPageId, onOpenRoute }) {
  const color =
    WIKI_GRAPH_TYPES.find((graphType) => graphType.type === group.type)?.cssColor ??
    "var(--graph-node-default)";

  return (
    <section className="wiki-index-section" aria-labelledby={`wiki-index-${group.type}`}>
      <div className="wiki-index-section-heading" id={`wiki-index-${group.type}`}>
        <span
          className="wiki-catalog-group-dot"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <span className="wiki-catalog-group-label">{getGroupLabel(group.type)}</span>
        <span className="wiki-catalog-group-count">{group.pages.length}</span>
      </div>
      <div className="wiki-catalog-group-list">
        {group.pages.map((page) => (
          <WikiCatalogItem
            key={page.id}
            page={page}
            selected={page.id === selectedPageId}
            onOpenRoute={onOpenRoute}
          />
        ))}
      </div>
    </section>
  );
}

function getInitialStateFromSearch(search) {
  return parseWikiExplorerSearch(search);
}

export default function WikiExplorer({ manifest, error, onRetry, focusedWikiId, search = "", onOpenRoute }) {
  const initial = useMemo(() => getInitialStateFromSearch(search), [search]);
  const [query, setQuery] = useState(initial.query);
  const [typeFilter, setTypeFilter] = useState(initial.typeFilter);
  const [tagFilter, setTagFilter] = useState(initial.tagFilter);
  const [entityFilters, setEntityFilters] = useState(initial.entityFilters);
  const [conceptFilters, setConceptFilters] = useState(initial.conceptFilters);
  const [sort, setSort] = useState(initial.sort);
  const [visibleTypes, setVisibleTypes] = useState(initial.visibleTypes);
  const [selectedId, setSelectedId] = useState(focusedWikiId ?? null);
  const lastSyncedSearchRef = useRef(search);
  const searchInputRef = useRef(null);
  const pages = manifest?.pages ?? [];

  useEffect(() => {
    setSelectedId(focusedWikiId ?? null);
  }, [focusedWikiId]);

  useEffect(() => {
    const next = getInitialStateFromSearch(search);
    if (search === lastSyncedSearchRef.current) {
      return;
    }
    lastSyncedSearchRef.current = search;
    setQuery(next.query);
    setTypeFilter(next.typeFilter);
    setTagFilter(next.tagFilter);
    setEntityFilters(next.entityFilters);
    setConceptFilters(next.conceptFilters);
    setSort(next.sort);
    setVisibleTypes(next.visibleTypes);
  }, [search]);

  useEffect(() => {
    const nextSearch = buildWikiExplorerSearch({
      query,
      typeFilter,
      tagFilter,
      entityFilters,
      conceptFilters,
      sort,
      visibleTypes,
    });
    if (nextSearch === lastSyncedSearchRef.current) {
      return;
    }
    lastSyncedSearchRef.current = nextSearch;
    onOpenRoute(buildWikiPath(focusedWikiId), { replace: true, search: nextSearch });
  }, [
    query,
    typeFilter,
    tagFilter,
    entityFilters,
    conceptFilters,
    sort,
    visibleTypes,
    focusedWikiId,
    onOpenRoute,
  ]);

  const pageTypes = useMemo(
    () => [ALL, ...Array.from(new Set(pages.map((page) => page.type))).sort()],
    [pages],
  );
  const tags = useMemo(
    () => [ALL, ...Array.from(new Set(pages.flatMap((page) => page.tags))).sort()],
    [pages],
  );
  const sortedPages = useMemo(() => sortPages(pages, sort), [pages, sort]);
  const searchedPages = useMemo(
    () => filterPagesByQuery(sortedPages, query, manifest?.pagesById ?? {}),
    [sortedPages, query, manifest],
  );
  const filteredPages = useMemo(
    () =>
      searchedPages.filter((page) => {
        const matchesType = typeFilter === ALL || page.type === typeFilter;
        const matchesTag = tagFilter === ALL || page.tags.includes(tagFilter);

        return matchesType && matchesTag;
      }),
    [searchedPages, typeFilter, tagFilter],
  );
  const groupedPages = useMemo(
    () =>
      groupPagesByType(filteredPages, new Set(pages.map((page) => page.type)), {
        preserveFirstMatchOrder: Boolean(query.trim()),
      }),
    [filteredPages, pages, query],
  );
  const filteredTopics = useMemo(
    () =>
      filterTopicsByExplorerState(manifest?.topics ?? [], {
        query,
        entityFilters,
        conceptFilters,
      }),
    [manifest, query, entityFilters, conceptFilters],
  );
  const activeTopicFilterIds = useMemo(
    () => getSelectedTopicFilterIds({ entityFilters, conceptFilters }),
    [entityFilters, conceptFilters],
  );
  const shouldShowTopicResults = Boolean(query || activeTopicFilterIds.length > 0);

  const selectPage = useCallback((id) => {
    setSelectedId(id);
    onOpenRoute(buildWikiPath(id, lastSyncedSearchRef.current));
  }, [onOpenRoute]);

  const filterTopicsForPage = useCallback((page) => {
    if (page.type === "entity") {
      setEntityFilters((current) => [...new Set([...current, page.id])].sort());
    } else if (page.type === "concept") {
      setConceptFilters((current) => [...new Set([...current, page.id])].sort());
    }
  }, []);

  const handleToggleType = useCallback((type) => {
    setVisibleTypes((current) => toggleVisibleType(current, type));
  }, []);

  const clearFilters = useCallback(() => {
    setQuery("");
    setTypeFilter(ALL);
    setTagFilter(ALL);
    setEntityFilters([]);
    setConceptFilters([]);
  }, []);

  const handleSurprise = useCallback(() => {
    const pick = pickRandomPage(pages, { excludeId: selectedId });
    if (pick) {
      setSelectedId(pick.id);
      onOpenRoute(buildWikiPath(pick.id, lastSyncedSearchRef.current));
    }
  }, [pages, selectedId, onOpenRoute]);

  useEffect(() => {
    const handler = (event) => {
      if (event.defaultPrevented) return;
      if (
        event.key === "Escape" &&
        (query || typeFilter !== ALL || tagFilter !== ALL || activeTopicFilterIds.length > 0)
      ) {
        event.preventDefault();
        clearFilters();
        return;
      }

      if (event.key === SEARCH_INPUT_KEY && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [query, typeFilter, tagFilter, activeTopicFilterIds, clearFilters]);

  if (!manifest) {
    return <WikiLoading onOpenRoute={onOpenRoute} error={error} onRetry={onRetry} />;
  }

  const hasActiveFilters = Boolean(query) || typeFilter !== ALL || tagFilter !== ALL || activeTopicFilterIds.length > 0;
  const selectedCandidate = selectedId ? manifest.pagesById[selectedId] : null;
  const selectedCandidateIsVisible =
    selectedCandidate && (!hasActiveFilters || filteredPages.some((page) => page.id === selectedCandidate.id));
  const searchDefaultPage = hasActiveFilters ? filteredPages[0] ?? null : null;
  const selectedPage =
    (focusedWikiId ? selectedCandidate : null) ??
    (selectedCandidateIsVisible ? selectedCandidate : null) ??
    (focusedWikiId ? null : searchDefaultPage ?? getDefaultWikiPage(pages));
  const selectedPageId = selectedPage?.id ?? selectedId;
  const graphSelectedId = resolveGraphFocusId(selectedPage, manifest.pagesById, visibleTypes);

  return (
    <ArchiveShell onOpenRoute={onOpenRoute} shellClassName="shell--wiki" activePath="/wiki">
      <main id="main-content" tabIndex={-1} className="wiki-shell">
        <section className="wiki-hero">
          <h2>LLM Wiki</h2>
          <p>
            Meetup topics, the sources behind them, and the entities and concepts that keep
            coming back.
          </p>
        </section>

        <section className="wiki-workspace">
          <div className="wiki-catalog">
            <div className="wiki-controls">
              <label className="wiki-search">
                <span className="sr-only">Search wiki</span>
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search pages (press /)"
                  type="search"
                />
              </label>
              <div className="wiki-select-row">
                <label>
                  <span className="sr-only">Filter by tag</span>
                  <select value={tagFilter} onChange={(event) => setTagFilter(event.target.value)}>
                    {tags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag === ALL ? "All tags" : tag}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className="sr-only">Sort catalog</span>
                  <select value={sort} onChange={(event) => setSort(event.target.value)}>
                    <option value="title">Title</option>
                    <option value="updated">Updated</option>
                    <option value="connections">Connections</option>
                    <option value="sources">Source links</option>
                  </select>
                </label>
              </div>
              {hasActiveFilters ? (
                <button
                  type="button"
                  className="wiki-clear-filters"
                  onClick={clearFilters}
                >
                  Clear filters
                </button>
              ) : null}
            </div>
            {shouldShowTopicResults ? (
              <WikiTopicSpotlight
                topics={filteredTopics}
                pagesById={manifest.pagesById}
                onOpenRoute={onOpenRoute}
              />
            ) : null}

            <div className="wiki-index-browser">
              <WikiIndexTabs
                pageTypes={pageTypes}
                activeType={typeFilter}
                pages={searchedPages}
                onSelectType={setTypeFilter}
              />
              <div className="wiki-catalog-list" aria-label="Wiki pages">
                {groupedPages.length > 0 ? (
                  groupedPages.map((group) => (
                    <WikiCatalogSection
                      key={group.type}
                      group={group}
                      selectedPageId={selectedPageId}
                      onOpenRoute={onOpenRoute}
                    />
                  ))
                ) : (
                  <p className="wiki-empty-copy">No wiki pages match those filters.</p>
                )}
              </div>
            </div>
          </div>

          <section className="wiki-graph-panel" aria-label="Wiki graph">
            <div className="wiki-panel-heading">
              <WikiGraphLegend visibleTypes={visibleTypes} onToggle={handleToggleType} />
              <button type="button" className="wiki-surprise" onClick={handleSurprise}>
                Surprise
              </button>
            </div>
            <WikiGraphView
              graph={manifest.graph}
              selectedId={graphSelectedId}
              onSelectPage={selectPage}
              visibleTypes={visibleTypes}
            />
          </section>

          <div className="wiki-detail-stack">
            {shouldShowTopicResults ? (
              <WikiTopicResults
                topics={filteredTopics}
                pagesById={manifest.pagesById}
                activeFilterIds={activeTopicFilterIds}
                onOpenRoute={onOpenRoute}
              />
            ) : null}
            <WikiDetail
              manifest={manifest}
              selectedPage={selectedPage}
              focusedWikiId={focusedWikiId}
              onOpenRoute={onOpenRoute}
              onTagClick={(tag) => setTagFilter(tag)}
              onTopicFilterClick={filterTopicsForPage}
              activeTag={tagFilter}
            />
          </div>
        </section>
      </main>
    </ArchiveShell>
  );
}
