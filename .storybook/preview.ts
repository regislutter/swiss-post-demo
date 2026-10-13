import type { Preview } from '@storybook/web-components-vite';
import { defineCustomElement } from '../dist/components/post-banner';
import '../src/global/styles.css';
import '../src/global/tokens.alt.css';
import a11y from './a11y.json';

// Registers <post-banner> from the Stencil build (`npm run build` runs first via the pre-scripts).
defineCustomElement();

const preview: Preview = {
  parameters: {
    layout: 'padded',
    a11y: {
      // 'error' makes a violation fail the story in the Canvas panel and in Storybook's test mode.
      test: 'error',
      config: {
        rules: a11y.disabledRules.map((id) => ({ id, enabled: false })),
      },
      // Explicit rather than axe's defaults: WCAG 2.0 to 2.2 A/AA (incl. 2.2 target size) plus best practices.
      options: { runOnly: { type: 'tag', values: [...a11y.tags] } },
    },
  },
};

export default preview;
