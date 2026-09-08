import { Component, lazy, Suspense } from "react";

const WikiGraph = lazy(() => import("./WikiGraph.jsx"));

/** Keeps a graph download or canvas failure from taking down the Wiki reader. */
export default class WikiGraphView extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="wiki-graph-frame wiki-graph-loading" role="status">
          <div>
            <p>The graph couldn’t load. You can still browse the Wiki below.</p>
            <button className="wiki-retry" onClick={() => window.location.reload()}>
              Reload Wiki
            </button>
          </div>
        </div>
      );
    }

    return (
      <Suspense fallback={
        <div className="wiki-graph-frame wiki-graph-loading" role="status">Loading graph…</div>
      }>
        <WikiGraph {...this.props} />
      </Suspense>
    );
  }
}
