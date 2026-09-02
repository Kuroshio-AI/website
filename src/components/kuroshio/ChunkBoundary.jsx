import { Component } from "react";

/**
 * A lazy chunk that fails to load rejects inside Suspense, and with no
 * boundary above it React unmounts the whole tree — one stale hashed filename
 * after a deploy takes the entire site to a blank page. Contain that to the
 * one section that actually failed.
 */
export class ChunkBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.error("[ChunkBoundary] section failed to load:", error);
    }
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
