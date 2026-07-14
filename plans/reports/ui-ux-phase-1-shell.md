# Phase 1 UI/UX shell guidance

Keep the root route intentionally neutral: a single application landmark with a clear page title and short status/copy that establishes the dashboard context without implying inventory data, navigation structure, filters, cards, colors, typography, or breakpoints that belong to later phases.

- Use semantic `header` and `main` landmarks; make the route title the sole `h1` and give `main` a stable target (`id="main-content"`). A visually available skip link is optional now but the target enables it when navigation arrives.
- Start with browser/system typography, readable default sizing (at least 16px body text), natural document flow, and fluid container sizing. Avoid fixed viewport heights, fixed desktop widths, and nested scrolling so the shell remains usable at any viewport without deciding responsive breakpoints.
- Preserve native focus visibility and logical DOM/tab order. Do not add controls, icon-only affordances, animation, or color-coded status before actual workflows need them.
- If development/MSW startup status is visible, keep it non-product-facing and do not use a transient live announcement; loading/error announcements should be introduced with real queries in later phases.
- Keep styling limited to reset-level/layout essentials and semantic CSS variables only if required by setup; defer palette, elevation, spacing scale, component primitives, dark mode, and visual aging treatment to the product UI phase.

This supports a clean launch proof while preserving the accepted deferred visual-system and responsive-breakpoint decisions.

**Status:** DONE
**Summary:** Defined an accessible, responsive-neutral root shell that avoids committing later dashboard visual decisions.
**Concerns/Blockers:** None.
