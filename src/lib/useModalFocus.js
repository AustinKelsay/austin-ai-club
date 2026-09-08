import { useEffect, useRef } from "react";

const FOCUSABLE = 'a[href], button, input, select, textarea, iframe, [tabindex]';

/** Keeps keyboard focus and page interaction inside either fullscreen surface. */
export function useModalFocus(ref, active, onClose) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const modal = ref.current;
    if (!active || !modal) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const siblings = new Map();
    // The graph is nested in the Wiki; make siblings inert at each ancestor.
    for (let branch = modal; branch.parentElement; branch = branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          siblings.set(sibling, sibling.inert);
          sibling.inert = true;
        }
      }
      if (branch.parentElement === document.body) break;
    }

    document.body.style.overflow = "hidden";
    modal.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onCloseRef.current();
      } else if (event.key === "Tab") {
        const controls = [...modal.querySelectorAll(FOCUSABLE)].filter(
          (element) => element.tabIndex >= 0 && !element.matches(":disabled") &&
            !element.closest("[inert]") && element.getClientRects().length > 0,
        );
        const first = controls[0];
        const last = controls.at(-1);
        const current = document.activeElement;
        if (!first) {
          event.preventDefault();
          modal.focus();
        } else if (event.shiftKey && (current === first || current === modal)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (current === last || !modal.contains(current))) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      for (const [sibling, wasInert] of siblings) sibling.inert = wasInert;
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [active, ref]);
}
