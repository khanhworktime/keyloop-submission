# v0.2.1 showcase validation

Status: passed for refinement review on 2026-07-14

## Required proof

- Browser DOM snapshots loaded both HTML documents and exposed their semantic
  regions; CSS braces are balanced and JavaScript passes `node --check`.
- Local stylesheet, script, logo, image, and iframe references resolve.
- Browser interaction confirmed desktop, tablet, and mobile working modes.
- Browser interaction confirmed populated, loading, empty, and error states.
- Browser interaction confirmed Table/Grid switching on desktop and tablet:
  Table is the AG Grid-style comparison surface, while Grid is the app-owned
  operational-card surface. Mobile hides the switch and keeps fast-check cards.
- Grid View renders four populated cards on desktop and two columns on tablet;
  Loading hides both populated surfaces and marks them busy.
- Visible controls are at least 44px; tablet filter actions are 48px.
- Desktop rows measure 60px and tablet rows measure 64px.
- Device surfaces have matching scroll/client widths in all three modes.
- Focus, selection, and semantic status use shape, text, border, or marker cues
  in addition to color.
- WCAG contrast calculations pass for primary text/white (17.93:1), secondary
  text/white (9.73:1), ready status (6.96:1), attention status (6.66:1),
  filter text/white (5.62:1), and selected blue text/surface (10.68:1).
- The data surface uses Community-safe patterns and keeps detail outside grid.
- Iconsax follows the approved vocabulary; Bold is selected-navigation only.
- The mobile Navigation Shell uses an accessible 44 × 44 icon-only Add Record
  action, an 18px copy-to-status gap, and the Iconsax Driver database glyph for
  Master Data.

## Build and preview evidence

- `node --check design/v0.2-component-language/scripts/showcase-controls.js`
  — passed.
- A local-reference Node check scanned every HTML `src`/`href` and returned
  `missing: []`.
- An AWK brace-count check returned balanced counts for all four CSS files.
- `file` and `sips -g pixelWidth -g pixelHeight` confirmed seven real PNG files
  at 1600 × 900.
- `npm run lint` and `npm run build` passed as repository integration checks;
  they validate the React application, not the standalone showcase HTML/CSS.
- Gallery and six refreshed viewport previews are PNG files rendered at
  1600 × 900. The data desktop preview records Grid View; the tablet preview
  records Table View; mobile records the fast-check presentation.
- Navigation preview folder: `previews/navigation-shell/`.
- Data-surface preview folder: `previews/ag-grid-data-surface/`.

## Reproduce static checks

Run from the repository root:

```bash
node --check design/v0.2-component-language/scripts/showcase-controls.js
git diff --check
node -e "const fs=require('fs'),path=require('path'),root='design/v0.2-component-language';const files=[];(function walk(d){for(const n of fs.readdirSync(d)){const p=path.join(d,n),s=fs.statSync(p);s.isDirectory()?walk(p):files.push(p)}})(root);const missing=[];for(const f of files.filter(x=>x.endsWith('.html'))){const c=fs.readFileSync(f,'utf8');for(const m of c.matchAll(/(?:src|href)=\"([^\"#]+)\"/g)){const v=m[1];if(!/^(https?:|data:|mailto:)/.test(v)&&!fs.existsSync(path.resolve(path.dirname(f),v)))missing.push([f,v])}}if(missing.length)throw Error(JSON.stringify(missing));console.log('missing: []')"
for f in design/v0.2-component-language/styles/*.css; do awk 'BEGIN{o=0;c=0}{o+=gsub(/{/,"{");c+=gsub(/}/,"}")}END{print FILENAME,o,c,(o==c?"balanced":"BROKEN")}' "$f"; done
find design/v0.2-component-language/previews -name '*.png' -exec file {} \; -exec sips -g pixelWidth -g pixelHeight {} \;
```

The local-reference check walks each v0.2 HTML file, extracts non-HTTP
`src`/`href` values, resolves them relative to that HTML file, and asserts
`fs.existsSync`; the recorded result is `missing: []`.

Browser checks used `[data-mode-target]`, `[data-state-target]`,
`[data-view-target]`, `.device`, `.ag-row`, `.detail-rail`, `.grid-frame`,
`.record-card-grid`, `.mobile-cards`, and `.state-layer`. They asserted
`scrollWidth === clientWidth`, no visible button below 44px, 60/64px grid row
heights, tablet detail-rail removal, mobile Table/Grid removal, correct pressed
state, and visible loading/empty/error containers. Browser viewport:
1600 × 900. These interaction checks depend on the in-app browser runtime and
are recorded inspection evidence rather than a standalone CLI test; production
Playwright coverage remains a later implementation task.

The in-app browser log contained one injected `MutationObserver.observe`
TypeError. No project source references `MutationObserver`, and every showcase
control remained operable, so this is recorded as browser-harness noise rather
than project runtime proof. Production console coverage remains pending.

## Known scope

These files visually model the future React/AG Grid implementation. Grid View
is a semantic projection of the same future inventory view model, not an AG Grid
Enterprise feature. The files do not claim production routing, persistence,
sorting, filtering, or grid behavior.
