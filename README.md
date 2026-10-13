# post-banner

An accessible `<post-banner>` Web Component for a design system: one persistent contextual message
(info, warning, success, error) with an optional call to action and an optional close button.

Built with [Stencil](https://stenciljs.com) (Shadow DOM, TypeScript strict), layered CSS custom-property
tokens, and Storybook stories that double as the executable test suite.

> Independent interview demo. It is not affiliated with, endorsed by, or built from the assets of Swiss Post;
> the `swisspost:` class prefix and `--post-*` token names only follow the naming convention of the brief it was built from.

## Quick start

Requires Node 22 LTS (`.nvmrc`).

```bash
npm ci
npm run storybook      # builds the component, then opens Storybook on :6006
npm test               # builds, then runs every story + keyboard/screenshot smoke in Chromium
npm run example        # plain-HTML consumer page on :8080 (after `npm run build`)
```

| Script | What it does |
|---|---|
| `npm run build` | Stencil build: lazy `dist/` (script tag), `dist/components/` (bundlers), generated docs |
| `npm run typecheck` | `tsc --noEmit` in strict mode for the component, stories, tests and config |
| `npm run check:contrast` | WCAG contrast guard for the token pairs, both themes, plus fallback drift |
| `npm run storybook` / `storybook:build` | Dev server / static build |
| `npm test` | Both Vitest projects below |
| `npm run test:stories` | Each story renders, runs its `play`, then axe (`addon-a11y`, `test: 'error'`) |
| `npm run test:smoke` | Tab order with real key events, plus one screenshot per story in `screenshots/` |

## Usage

```html
<link rel="stylesheet" href="dist/post-banner/post-banner.css" /> <!-- tokens -->
<script type="module" src="dist/post-banner/post-banner.esm.js"></script>

<post-banner variant="warning" dismissible cta-label="Review settings" cta-href="/settings">
  <span slot="title">Action required soon</span>
  Update your preferences before the deadline.
</post-banner>
```

```js
banner.addEventListener('postBannerDismiss', (event) => console.log(event.detail)); // { reason: 'close-button' }
banner.addEventListener('postBannerCta', (event) => console.log(event.detail));     // { href?: string }
banner.open = true; // reopen
```

The full, generated API (props, events, slots) is in [`src/components/post-banner/readme.md`](src/components/post-banner/readme.md).
A runnable framework-free page is in [`examples/plain-html/`](examples/plain-html/index.html).

## Contract in one screen

- `variant`: `info | warning | success | error` (default `info`; unknown values fall back).
- `announce`: `status` (polite, default) or `alert` (assertive, urgent only). **Not derived from `variant`.**
  The role lives on the inner `<section>`, never on the host, so nothing is announced twice.
- `dismissible` is `false` by default. `open` is mutable and reflected: dismissing sets it to `false`, the host gets `hidden`, and a parent can reopen it.
- The banner never moves focus. After `postBannerDismiss` the parent decides where focus goes.
- Title is the `title` slot (heading level via `heading-level`). Without one, `label` names the region; with neither, dev builds warn.
- Accessible strings are props (`close-label`), not hard-coded in a language.

## Tokens

`primitive -> semantic -> component -> CSS property`

| Layer | Where | Rule |
|---|---|---|
| Primitive (`--post-color-*`, `--post-space-*`) | `src/global/tokens.css` | Raw values. Never consumed by the component. |
| Semantic (`--post-feedback-*`, `--post-focus-ring`) | `src/global/tokens.css` | Product intent. **Re-theme here**, e.g. `src/global/tokens.alt.css`. |
| Component (`--post-banner-*`) | `banner.css` `:host` | Resolved from the semantic layer with safe fallbacks. Override on the element for one instance. |

`npm run check:contrast` enforces the contrast of every pair and fails if a fallback in `banner.css` drifts from its token.

## What is tested, and what is not

See [`DEMO.md`](DEMO.md) for the matrix of what axe, `play` functions, the smoke project and manual checks each cover, and for the limits.
