import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ArchiveShell from "./ArchiveShell.jsx";

describe("ArchiveShell", () => {
  it("exposes the Sovereign AI Club wordmark and omits the retired name", () => {
    const html = renderToStaticMarkup(<ArchiveShell onOpenRoute={() => {}} />);

    expect(html).toContain('aria-label="Sovereign AI Club"');
    expect(html).toContain("Sovereign AI Club");
    expect(html).not.toContain("Austin AI Club");
    expect(html).not.toContain(">$<");
  });

  it("names the club once visibly: the wordmark, with no repeated title or domain text", () => {
    const html = renderToStaticMarkup(<ArchiveShell onOpenRoute={() => {}} />);

    expect(html).toContain('<h1 class="sr-only">Sovereign AI Club</h1>');
    expect(html).not.toContain("austinai.club");
    expect(html).not.toContain("Meetup topics, demos, and notes");
    expect(html.match(/sovereign-wordmark-ascii/g)).toHaveLength(2);
  });

  it("does not offer a theme toggle", () => {
    const html = renderToStaticMarkup(<ArchiveShell onOpenRoute={() => {}} />);

    expect(html).not.toContain("theme-toggle");
    expect(html).not.toContain("Switch to light theme");
    expect(html).not.toContain("Switch to dark theme");
  });
});
