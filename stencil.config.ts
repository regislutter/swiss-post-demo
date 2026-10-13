import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'post-banner',
  // Imports tokens.css, so the primitive + semantic tokens ship as dist/post-banner/post-banner.css.
  globalStyle: 'src/global/styles.css',
  outputTargets: [
    // Lazy-loading build for plain <script type="module"> pages (examples/plain-html).
    { type: 'dist', esmLoaderPath: '../loader' },
    // Self-contained modules for bundlers: Storybook's Vite build cannot resolve the lazy loader's relative import().
    { type: 'dist-custom-elements' },
    { type: 'docs-readme' },
  ],
};
