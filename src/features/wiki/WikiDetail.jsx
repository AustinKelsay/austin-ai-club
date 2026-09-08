import { useEffect, useMemo, useState } from "react";
import { buildWikiPath } from "../../app/routes.js";
import RouteLink from "../../components/RouteLink.jsx";
import { formatRelativeDate } from "./wikiDates.js";
import {
  getWikiLeadParagraph,
  hasWikiHeading,
  WikiInlineMarkdown,
  WikiMarkdownBody,
} from "./WikiMarkdownBody.jsx";
import {
  buildWikiSourceFilterOptions,
  buildWikiSourceItems,
  filterWikiSourceItems,
  getWikiSourceLinkLabel,
} from "./wikiSourceFilters.js";

function pluralize(count, singular) {
  return `${count} ${singular}${count === 1 ? "" : "s"}`;
}

function getPageTypeLabel(type) {
  return type.replace(/-/g, " ");
}

/** Meetup boards open with a generated "Related wiki pages: …" line that a link list renders better. */
const RELATED_EXCERPT_PATTERN = /^related wiki pages:/i;

function getConnectedPages(manifest, ids) {
  return ids.map((id) => manifest.pagesById[id]).filter(Boolean);
}

/** Keeps the first occurrence of each page id, preserving order. */
function dedupePages(pages) {
  const seen = new Set();
  return pages.filter((page) => (seen.has(page.id) ? false : seen.add(page.id)));
}

function PageLinkList({ title, pages, emptyLabel, onOpenRoute, className = "" }) {
  return (
    <section className={["wiki-detail-section", className].filter(Boolean).join(" ")}>
      <h3>{title}</h3>
      {pages.length > 0 ? (
        <div className="wiki-link-list">
          {pages.map((page) => (
            <RouteLink
              key={page.id}
              to={buildWikiPath(page.id)}
              onOpenRoute={onOpenRoute}
              className="wiki-relation-link"
            >
              <span className="wiki-link-label">{page.title}</span>
              <small>{getPageTypeLabel(page.type)}</small>
            </RouteLink>
          ))}
        </div>
      ) : (
        <p className="wiki-empty-copy">{emptyLabel}</p>
      )}
    </section>
  );
}

function groupSourcesBySection(items) {
  const groups = new Map();

  for (const item of items) {
    const section = item.section || "source";
    if (!groups.has(section)) {
      groups.set(section, []);
    }
    groups.get(section).push(item);
  }

  const preferredOrder = [
    "source",
    "Local Builds & Projects",
    "Agent Infrastructure",
    "Models & Research",
    "Security",
    "Big Tech Moves",
  ];

  return [...groups.entries()].sort(([a], [b]) => {
    const aIndex = preferredOrder.indexOf(a);
    const bIndex = preferredOrder.indexOf(b);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    if (aIndex !== -1) {
      return -1;
    }

    if (bIndex !== -1) {
      return 1;
    }

    return a.localeCompare(b);
  });
}

function getSectionLabel(section) {
  if (section === "source") {
    return "Direct sources";
  }

  return section;
}

function SourceReferenceLink({ item }) {
  return (
    <a
      className="wiki-relation-link wiki-source-reference"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="wiki-source-reference-copy">
        <span className="wiki-link-label">{item.title}</span>
        <small>{getWikiSourceLinkLabel(item.href)}</small>
        <small>{item.provenance}</small>
      </span>
      <small>{item.section || "source"}</small>
    </a>
  );
}

/**
 * One source filter. A select with a single choice cannot narrow anything, so it
 * is not rendered unless a value is already applied (so it can still be cleared).
 */
function SourceFilterSelect({ label, value, options, onChange }) {
  if (options.length < 2 && !value) {
    return null;
  }

  return (
    <label className="wiki-source-filter">
      <span>{label}</span>
      <select
        aria-label={`Filter Sources by ${label}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">All {label === "provenance" ? "sources" : `${label}s`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SourceReferenceList({ items, allItemsCount, emptyLabel, filters, options, onFilterChange }) {
  if (items.length === 0) {
    return (
      <section className="wiki-detail-section wiki-detail-section--sources">
        <h3>Sources</h3>
        {allItemsCount > 0 ? (
          <>
            <SourceFilters filters={filters} options={options} onFilterChange={onFilterChange} />
            <p className="wiki-empty-copy">No sources match these filters.</p>
          </>
        ) : (
          <p className="wiki-empty-copy">{emptyLabel}</p>
        )}
      </section>
    );
  }

  const grouped = groupSourcesBySection(items);

  return (
    <section className="wiki-detail-section wiki-detail-section--sources">
      <div className="wiki-source-heading">
        <h3>Sources</h3>
        <small>{items.length === allItemsCount ? pluralize(items.length, "source") : `${items.length} of ${allItemsCount} sources`}</small>
      </div>
      <SourceFilters filters={filters} options={options} onFilterChange={onFilterChange} />
      <div className="wiki-source-groups">
        {grouped.map(([section, sectionItems]) => (
          <div key={section} className="wiki-source-group">
            <h4 className="wiki-source-group-title">{getSectionLabel(section)}</h4>
            <div className="wiki-link-list">
              {sectionItems.map((item) => (
                <SourceReferenceLink key={`${item.title}-${item.href}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceFilters({ filters, options, onFilterChange }) {
  return (
    <div className="wiki-source-filters" aria-label="Source filters">
      <SourceFilterSelect
        label="provenance"
        value={filters.provenance}
        options={[
          { value: "direct", label: "Direct" },
          { value: "referenced", label: "Referenced Topic" },
        ]}
        onChange={(value) => onFilterChange("provenance", value)}
      />
      <SourceFilterSelect
        label="Meetup"
        value={filters.meetup}
        options={options.meetups.map((value) => ({ value, label: value }))}
        onChange={(value) => onFilterChange("meetup", value)}
      />
      <SourceFilterSelect
        label="Track"
        value={filters.track}
        options={options.tracks.map((value) => ({ value, label: value }))}
        onChange={(value) => onFilterChange("track", value)}
      />
      <SourceFilterSelect
        label="Topic Title"
        value={filters.topicTitle}
        options={options.topicTitles.map((value) => ({ value, label: value }))}
        onChange={(value) => onFilterChange("topicTitle", value)}
      />
    </div>
  );
}

function CopyLinkButton({ page }) {
  const [copied, setCopied] = useState(false);

  if (!page) {
    return null;
  }

  const handleCopy = async () => {
    if (typeof window === "undefined") {
      return;
    }
    const url = `${window.location.origin}${buildWikiPath(page.id)}`;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      className={`wiki-source-link wiki-copy-link wiki-detail-action ${copied ? "wiki-copy-link--copied" : ""}`}
      onClick={handleCopy}
    >
      {copied ? "Link copied" : "Copy link"}
    </button>
  );
}

export function WikiDetail({
  manifest,
  selectedPage,
  focusedWikiId,
  onOpenRoute,
  onTagClick,
  onTopicFilterClick,
  activeTag = null,
}) {
  const [sourceFilters, setSourceFilters] = useState({
    provenance: "",
    meetup: "",
    track: "",
    topicTitle: "",
  });

  useEffect(() => {
    setSourceFilters({ provenance: "", meetup: "", track: "", topicTitle: "" });
  }, [selectedPage?.id]);

  const sourceItems = useMemo(
    () => (selectedPage ? buildWikiSourceItems(selectedPage) : []),
    [selectedPage],
  );
  const sourceFilterOptions = useMemo(
    () => buildWikiSourceFilterOptions(sourceItems),
    [sourceItems],
  );
  const filteredSourceItems = useMemo(
    () => filterWikiSourceItems(sourceItems, sourceFilters),
    [sourceItems, sourceFilters],
  );

  if (!selectedPage) {
    return (
      <aside className="wiki-detail wiki-detail--missing">
        <p className="eyebrow">Page not found</p>
        <h2>{focusedWikiId}</h2>
        <p>
          No public LLM Wiki page currently matches this route. The explorer still has the
          published catalog below.
        </p>
      </aside>
    );
  }

  const hasBody = Boolean(selectedPage.bodyMarkdown);
  const backlinkPages = getConnectedPages(manifest, selectedPage.backlinkIds);
  const meetupBacklinks = backlinkPages.filter((page) => page.type === "meetup");
  const updatedLabel = formatRelativeDate(selectedPage.updated || selectedPage.created);
  // The authored body usually opens with a summary paragraph and carries its own
  // "Mentioned In" and "Related" sections; show each once rather than in both the
  // header/sidebar and the body.
  const leadParagraph = getWikiLeadParagraph(selectedPage.bodyMarkdown, selectedPage.title);
  const bodyListsMentions = hasWikiHeading(selectedPage.bodyMarkdown, "Mentioned In");
  // Pages without an authored body (meetup boards, queries, source records) get one
  // merged "Connected Pages" list instead of near-identical outgoing and backlink lists.
  const connectedPages = hasBody
    ? []
    : dedupePages([...getConnectedPages(manifest, selectedPage.outgoingIds), ...backlinkPages]);
  const excerptIsRelatedList = RELATED_EXCERPT_PATTERN.test(selectedPage.excerpt ?? "");
  const summary = leadParagraph ? (
    <WikiInlineMarkdown text={leadParagraph} pagesById={manifest.pagesById} onOpenRoute={onOpenRoute} />
  ) : excerptIsRelatedList && connectedPages.length > 0 ? null : (
    selectedPage.excerpt || "No excerpt is available yet."
  );

  return (
    <aside className="wiki-detail">
      <div className="wiki-detail-summary">
        <h2>{selectedPage.title}</h2>
        {summary ? <p className="wiki-detail-copy">{summary}</p> : null}
        {updatedLabel ? (
          <p className="wiki-detail-freshness" aria-label={`Last updated ${updatedLabel}`}>
            Updated {updatedLabel}
          </p>
        ) : null}
      </div>

      <div className="wiki-tags" aria-label={`${selectedPage.title} tags`}>
        {selectedPage.tags.map((tag) =>
          onTagClick ? (
            <button
              key={tag}
              type="button"
              className={`wiki-tag wiki-tag--clickable ${tag === activeTag ? "wiki-tag--active" : ""}`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ) : (
            <span key={tag} className="wiki-tag">
              {tag}
            </span>
          ),
        )}
      </div>

      {onTopicFilterClick && ["entity", "concept"].includes(selectedPage.type) ? (
        <button
          type="button"
          className="wiki-source-link wiki-topic-filter-button wiki-detail-topic-filter"
          onClick={() => onTopicFilterClick(selectedPage)}
        >
          Show matching Topics
        </button>
      ) : null}

      <WikiMarkdownBody
        markdown={selectedPage.bodyMarkdown}
        pageTitle={selectedPage.title}
        pagesById={manifest.pagesById}
        onOpenRoute={onOpenRoute}
        omitLeadParagraph={Boolean(leadParagraph)}
      />

      <SourceReferenceList
        items={filteredSourceItems}
        allItemsCount={sourceItems.length}
        emptyLabel="No sources captured yet."
        filters={sourceFilters}
        options={sourceFilterOptions}
        onFilterChange={(key, value) =>
          setSourceFilters((current) => ({ ...current, [key]: value }))
        }
      />

      <div className="wiki-detail-side">
        {!bodyListsMentions && meetupBacklinks.length > 0 ? (
          <PageLinkList
            title="Mentioned In"
            pages={meetupBacklinks}
            emptyLabel=""
            onOpenRoute={onOpenRoute}
            className="wiki-detail-section--mentioned"
          />
        ) : null}
        {hasBody ? (
          <PageLinkList
            title="Backlinks"
            pages={backlinkPages}
            emptyLabel="No backlinks yet."
            onOpenRoute={onOpenRoute}
            className="wiki-detail-section--backlinks"
          />
        ) : (
          <PageLinkList
            title="Connected Pages"
            pages={connectedPages}
            emptyLabel="No connected pages yet."
            onOpenRoute={onOpenRoute}
            className="wiki-detail-section--backlinks"
          />
        )}

        {selectedPage.unresolvedLinks.length > 0 ? (
          <section className="wiki-detail-section wiki-detail-section--unresolved">
            <h3>Unresolved</h3>
            <div className="wiki-tags wiki-tags--quiet">
              {selectedPage.unresolvedLinks.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </div>
          </section>
        ) : null}

        <div className="wiki-detail-actions">
          <a className="wiki-source-link wiki-detail-action" href={selectedPage.rawHref}>
            Open Markdown source
          </a>
          <CopyLinkButton page={selectedPage} />
        </div>
      </div>
    </aside>
  );
}
