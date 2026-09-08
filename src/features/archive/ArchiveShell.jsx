/**
 * Shared wordmark, navigation, and footer for the archive and Wiki Explorer.
 */
import {
  LINK_SUBMISSION_PATH,
  SHOWCASE_SUBMISSION_PATH,
  WIKI_PATH_PREFIX,
} from "../../app/constants.js";
import RouteLink from "../../components/RouteLink.jsx";
import SovereignWordmark from "../brand/SovereignWordmark.jsx";

/**
 * Renders the shared archive shell.
 * @param {{ children: import("react").ReactNode, onOpenRoute: Function, shellClassName?: string, activePath?: string }} props
 */
export default function ArchiveShell({ children, onOpenRoute, shellClassName = "", activePath }) {
  return (
    <div className={["shell", shellClassName].filter(Boolean).join(" ")}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="topbar">
        <div className="topbar-left">
          <h1 className="sr-only">Sovereign AI Club</h1>
          <RouteLink to="/" onOpenRoute={onOpenRoute} className="brand brand-link">
            <SovereignWordmark compact />
          </RouteLink>
        </div>
        <nav className="topbar-right" aria-label="Main navigation">
          <RouteLink to={WIKI_PATH_PREFIX} onOpenRoute={onOpenRoute} className="topbar-link"
            aria-current={activePath === WIKI_PATH_PREFIX ? "page" : undefined}>
            Wiki
          </RouteLink>
          <RouteLink to={LINK_SUBMISSION_PATH} onOpenRoute={onOpenRoute} className="topbar-link">
            Links
          </RouteLink>
          <RouteLink to={SHOWCASE_SUBMISSION_PATH} onOpenRoute={onOpenRoute} className="topbar-link">
            Showcase
          </RouteLink>
          <RouteLink to="/calendar" onOpenRoute={onOpenRoute} className="calendar-open-btn">
            Calendar
          </RouteLink>
        </nav>
      </header>

      {children}

      <footer className="footer">
        <SovereignWordmark compact />
        <div className="footer-links">
          <a
            href="https://github.com/AustinKelsay/austin-ai-club"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
