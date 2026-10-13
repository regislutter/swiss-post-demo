# Demo runbook: `post-banner` (45 minutes)

Pre-built demo. Everything below was run; nothing here is aspirational unless marked **not covered**.

> One sentence to land: *"I can deliver a useful component quickly, but I make its invariants explicit,
> I measure its quality, and I plan for adoption."*

## Before the session (5 minutes)

```bash
npm ci
npm run build && npm run typecheck && npm run check:contrast
npm test                      # expect: 2 files, 31 tests passed
npm run storybook             # leave it running on :6006
```

Open in tabs: Storybook (`Feedback/PostBanner`), `examples/plain-html` (`npm run example`), the GitHub Actions page,
and the draft PR `demo/a11y-failure` (red check).

## Timeline

| Time | Show | Command / place | Message |
|---:|---|---|---|
| 0-3 | Context and assumptions | talk | A banner is cross-cutting: content, CTA, theming, a11y, integration. `status` by default, `alert` only if urgent. |
| 3-6 | Contract | `README.md` "Contract in one screen" | Four variants, `open`, CTA, slots, two events. Stories are the executable documentation. |
| 6-10 | API anatomy | `src/components/post-banner/banner.tsx` | Typed props, Shadow DOM, runtime normalisation of unknown values, role only on the inner element. |
| 10-14 | Storybook live | `npm run storybook` | Controls, `AllVariants`, `SlottedActions`, `LongCopy` (reflow), `Themed`. Open the **Accessibility** panel. |
| 14-18 | Keyboard and `play` | story `WarningDismissible`, Interactions panel | Queries by role and name, not by class. Explain *why* `shadow-dom-testing-library`: Testing Library does not pierce shadow roots. |
| 18-22 | **Intentional a11y failure** | see below | Reviewer sees red in the Canvas, then in the test run, then in CI. |
| 22-25 | Fix and rerun | see below | A blocked PR instead of a release-time discovery. |
| 25-29 | Tokens | `src/global/tokens.css`, `banner.css`, story `Themed` | `primitive -> semantic -> component`. Re-theme at the semantic layer; show `npm run check:contrast`. |
| 29-33 | Stencil code | `banner.tsx` | `@Prop`, `@State`, `@Event`, slots, `shadow: true`; consumable from plain HTML (`examples/plain-html`). |
| 33-37 | CI | `.github/workflows/ci.yml` | typecheck, contrast, build, Storybook build, Chromium, Vitest (stories + smoke), screenshots artifact. |
| 37-40 | Limits | "Coverage matrix" below | Axe is not exhaustive; screenshots are not regression tests; manual AT testing is still required. |
| 40-43 | Trade-offs | FAQ below | Stencil vs React, Shadow DOM, cost of the test setup, adoption. |
| 43-45 | Wrap-up | talk | Contract, tokens, a11y, executable stories, reproducible CI. |

## Intentional a11y failure (minutes 18-25)

The close button lives in the component, so the regression is a one-line change to `banner.tsx`:
it removes the button's accessible name (`aria-label={this.closeLabel}`).

```bash
git checkout demo/a11y-failure
npm run build                 # stories consume dist/, so rebuild (or keep `npm run build:watch` running)
npm run test:stories          # fails in ~3 s with: "Buttons must have discernible text (button-name)"
```

1. In the running Storybook, open `Feedback/PostBanner > Warning` and show the red **Accessibility** panel first.
2. Run the command above and read the violation: `$('post-banner,.swisspost\:close')`, rule `button-name`.
   Point out that axe pierces the shadow root, and that the role/name `play` assertions fail too (double signal).
3. Show the draft PR: the same failure blocks CI.
4. Restore and rerun:

```bash
git checkout main
npm run build && npm run test:stories    # green again
```

5. Say what axe did **not** prove: that Tab reaches the control, that Enter closes it, that the label is useful.
   Those are the `play` and `smoke` tests.

Do not simulate the failure with an arbitrary failing assertion: the point is a realistic regression.
`demo/a11y-failure` is never merged.

## Coverage matrix

| Concern | Covered by | How | Not covered |
|---|---|---|---|
| Structural a11y rules (names, roles, contrast of rendered text, ARIA validity) | axe via `addon-a11y` (`test: 'error'`) in `npm run test:stories` | Runs after each story's `play`, on the final DOM, WCAG 2.x A/AA + best practices | Usefulness of text, correctness of the chosen role, anything not rendered in that story state |
| Role and accessible name | `play` functions | `findByShadowRole(host, 'status', { name })` | Real screen reader output |
| Click, Enter, Space, event payloads, reopen, focus return | `play` functions | `userEvent` + spies | Other browsers |
| Tab order across shadow roots | `npm run test:smoke` | Vitest browser `userEvent.tab()` = real key events; stories opt in via `parameters.tabOrder` | Shift+Tab, other browsers |
| Reflow of long content | `LongCopy` `play` | `scrollWidth <= clientWidth` at 20rem | Zoom to 400% on real devices |
| Token contrast, both themes, fallback drift | `npm run check:contrast` | Pure computation from the CSS | Hover/disabled states, real content over images |
| Visual smoke | `npm run test:smoke` | One PNG per story, uploaded as a CI artifact | **Regression detection**: no baselines, nothing is diffed |
| Screen reader behaviour (VoiceOver, NVDA) | **not covered** | Manual checklist below | Everything |
| Safari, Firefox | **not covered** | CI runs Chromium only | Everything |

### Manual checklist (not run by me; run before the interview)

- [ ] VoiceOver (macOS, Safari and Chrome): the title is read with the region; the close button reads "Close, button".
- [ ] Insert a banner dynamically with `announce="status"`, then `alert`: confirm polite vs assertive announcements.
- [ ] Windows High Contrast / forced colours: the accent bar and glyph border remain visible.
- [ ] 200% and 400% zoom; `prefers-reduced-motion` (the component has no animation).
- [ ] Tab through `examples/plain-html` in Safari and Firefox.

## FAQ (answers matched to what is actually built)

**Does Shadow DOM break accessibility?** No: native elements inside it are in the accessibility tree, and axe pierces open
shadow roots. The cost is tooling: Testing Library cannot see inside, and `userEvent.tab()` from user-event cannot cross it.
I used `shadow-dom-testing-library` for queries and the browser's real keyboard for tab order. Both are in this repo.

**Why `status` and not always `alert`?** `alert` is assertive and interrupts. The role is the product's call (`announce`),
never derived from `variant`: a persistent validation error is usually a `status`. Also note live regions announce
*changes*: a banner already in the page at load is not announced, so do not rely on `role` for page-load messages.

**Why did you rename `role` and `ariaLabel`?** Stencil reserves both names (they exist on `HTMLElement`), so the build fails.
It also avoids a real bug: a `role` attribute on the host would sit on top of the inner `<section>`'s role and announce twice.

**Does axe prove it is accessible?** No. It checks computable rules. The `play` and smoke tests cover behaviour; humans and
assistive technology cover usefulness and experience.

**Why Vitest instead of `@storybook/test-runner`?** The brief specifies the test-runner. I started there, then found that
Storybook has ended official support for it and that with Storybook 10.6 it cannot load a hooks config at all
(`module.register() is not supported in Jest`), so the axe/tab-order/screenshot hooks cannot run. Storybook recommends the
Vitest addon for Vite-based frameworks, so stories run as Vitest browser-mode tests in real Chromium. The stories and `play`
functions are unchanged. Trade-off: tests run against the Vite-served stories, not against the published static Storybook;
CI still builds the static Storybook so a broken build fails.

**Why Stencil over React?** Stencil outputs standard Custom Elements usable from React, Vue, Angular or plain HTML
(`examples/plain-html`). React is excellent for an app; here the requirement is a cross-framework building block. Cost:
extra tooling and event conventions to document.

**Does Shadow DOM prevent theming?** It prevents accidental style injection. Custom properties cross the boundary, so the
public theming surface is documented tokens: re-theme the semantic layer (`Themed` story) or override `--post-banner-*` on one element.

**Why is the `swisspost:` class prefix there if Shadow DOM already isolates styles?** It is the brief's convention and is kept
(and asserted in a `play` function). It is belt-and-braces: it only matters for consumers who render the markup into the light
DOM. The colon must be escaped in CSS selectors (`.swisspost\:banner`) and never in the class attribute.

**Why does dismissal not move focus?** The component cannot know where focus belongs. After `postBannerDismiss` the parent
decides (story `DismissWithFocusReturn`, and `examples/plain-html`). Leaving focus on a hidden button would drop it to `<body>`.

**How do you guarantee contrast on overridable tokens?** The default and alternative themes are validated in CI
(`npm run check:contrast`), and the fallbacks in `banner.css` are checked against the tokens. Consumers who override tokens
must run their own checks; this is a documented guard, not a guarantee.

**What is missing to industrialise?** Framework wrappers, MDX guidelines, a real visual regression tool, cross-browser CI,
manual AT test plans, versioning/changelog, lint/format, deprecation policy, dark theme with the same semantic contract.

## Where this deviates from the brief (and why)

| Brief | This repo | Reason |
|---|---|---|
| `@Prop() role`, `@Prop() ariaLabel` | `announce`, `label` | Reserved by Stencil (build error); also avoids a doubled role. |
| `@storybook/test-runner` + `axe-playwright` against the built Storybook | Vitest addon (`@storybook/addon-vitest`) | Test runner support ended and it cannot load hooks on Storybook 10.6. |
| `@storybook/test` | `storybook/test` | `@storybook/test` is frozen at 8.6. |
| `canvas.getByRole(...)`, `toHaveFocus` in `play` | `shadow-dom-testing-library`, `shadowRoot.activeElement` | Testing Library does not pierce shadow roots. |
| `userEvent.tab()` in `play` | Real key events in the `smoke` project | user-event cannot cross a shadow root. |
| `tokens/component.css` with `post-banner { --post-banner-* }` | Component layer only in `banner.css` `:host` | The outer rule beats `:host([data-variant])` and flattens every variant to `info`. |
| Close button `aria-label` in French | `closeLabel` prop | A hard-coded language does not fit a multilingual library. |
| Two-column mobile grid | Three columns kept | The brief's rule put the close button on top of the title. |
| `.swisspost\:actions` always rendered | Hidden when empty | Avoids an empty row with margin. |
| Heading always rendered | Rendered but `hidden` until a title exists | Avoids an empty heading (axe `empty-heading`). |
| §4.5 demo edits a story | Edit the component on branch `demo/a11y-failure` | `ErrorUrgent` is not dismissible and the close button is in `banner.tsx`. |
| §2.1 mentions `open` | `open` is a real prop | The brief's text and API table contradicted each other. |
| axe `region` rule on | Disabled for stories only (`.storybook/a11y.json`) | A story is a fragment, not a page; the rule would fail every story. A real page must still be audited as a whole. |
| `http-server ... &` in CI | Not needed | Vitest serves the stories itself; Storybook is still built in CI. |
| `@postBannerDismiss` in JSX | `onPostBannerDismiss` | Stencil JSX handler syntax. |
| Dark theme / React wrapper | Not built | Out of scope for this demo. |
