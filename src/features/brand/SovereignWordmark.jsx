/**
 * ASCII-art club wordmark plus the AI / CLUB lockup.
 * Approximates the Brand Poster; the designer's original text replaces this when supplied.
 */

export const SOVEREIGN_ASCII = [
  " ____   _____     _______ ____  _____ ___ ____ _   _",
  "/ ___| / _ \\ \\   / / ____|  _ \\| ____|_ _/ ___| \\ | |",
  "\\___ \\| | | \\ \\ / /|  _| | |_) |  _|  | | |  _|  \\| |",
  " ___) | |_| |\\ V / | |___|  _ <| |___ | | |_| | |\\  |",
  "|____/ \\___/  \\_/  |_____|_| \\_\\_____|___\\____|_| \\_|",
].join("\n");

/**
 * Renders the Sovereign AI Club wordmark.
 * @param {{ compact?: boolean, className?: string }} props
 */
export default function SovereignWordmark({ compact = false, className = "" }) {
  const classes = ["sovereign-wordmark", compact ? "sovereign-wordmark--compact" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="img" aria-label="Sovereign AI Club">
      <pre className="sovereign-wordmark-ascii" aria-hidden="true">
        {SOVEREIGN_ASCII}
      </pre>
      <p className="sovereign-wordmark-lockup" aria-hidden="true">
        <span className="sovereign-wordmark-ai">AI</span>
        <span className="sovereign-wordmark-club">CLUB</span>
      </p>
    </div>
  );
}
