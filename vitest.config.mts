import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// A factory, not a shared object: Vitest mutates the browser config per project.
const browser = () => ({
  enabled: true,
  headless: true,
  provider: playwright({}),
  instances: [{ browser: 'chromium' as const }],
});

// More info at: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [
      {
        // Every story becomes a test: render, run `play`, then axe (addon-a11y, `test: 'error'`).
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: { name: 'storybook', browser: browser() },
      },
      {
        // Real-keyboard tab order and screenshots, composed from the same stories.
        extends: true,
        test: {
          name: 'smoke',
          include: ['src/**/*.smoke.test.ts'],
          setupFiles: ['./.storybook/vitest.smoke.setup.ts'],
          browser: browser(),
        },
      },
    ],
  },
});
