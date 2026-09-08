import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WikiGraphLegend } from "./WikiGraphLegend.jsx";

function findTypeSegments(markup) {
  return [...markup.matchAll(/<button[^>]*data-type="([^"]+)"[^>]*aria-pressed="(true|false)"/g)].map(
    ([, type, pressed]) => ({ type, pressed: pressed === "true" }),
  );
}

describe("WikiGraphLegend", () => {
  it("labels the graph node colors by wiki page type", () => {
    const markup = renderToStaticMarkup(<WikiGraphLegend />);

    expect(markup).toContain("Meetup");
    expect(markup).toContain("Entity");
    expect(markup).toContain("Concept");
    expect(markup).toContain("background-color:var(--graph-meetup)");
    expect(markup).toContain("background-color:var(--graph-entity)");
    expect(markup).toContain("background-color:var(--graph-concept)");
  });

  it("renders every type as a toggleable button", () => {
    const markup = renderToStaticMarkup(
      <WikiGraphLegend
        visibleTypes={new Set(["meetup", "entity", "concept", "comparison", "query"])}
      />,
    );

    const segments = findTypeSegments(markup);
    const types = segments.map((segment) => segment.type);

    expect(types).toEqual(["meetup", "entity", "concept", "comparison", "query"]);
    expect(segments.every((segment) => segment.pressed)).toBe(true);
    expect((markup.match(/<button/g) ?? []).length).toBe(5);
  });

  it("marks visible types as pressed and hidden types as unpressed", () => {
    const markup = renderToStaticMarkup(
      <WikiGraphLegend visibleTypes={new Set(["meetup", "entity"])} />,
    );

    const segments = findTypeSegments(markup);
    const pressed = segments.filter((segment) => segment.pressed).map((s) => s.type);
    const hidden = segments.filter((segment) => !segment.pressed).map((s) => s.type);

    expect(pressed).toEqual(["meetup", "entity"]);
    expect(hidden).toEqual(["concept", "comparison", "query"]);
  });

  it("defaults to all types visible when no visibleTypes prop is provided", () => {
    const markup = renderToStaticMarkup(<WikiGraphLegend />);
    const segments = findTypeSegments(markup);

    expect(segments).toHaveLength(5);
    expect(segments.every((segment) => segment.pressed)).toBe(true);
  });

  it("uses accessible labels that announce the toggle action", () => {
    const markup = renderToStaticMarkup(<WikiGraphLegend />);

    expect(markup).toContain('aria-label="Toggle Meetup nodes"');
    expect(markup).toContain('aria-label="Toggle Entity nodes"');
  });
});
