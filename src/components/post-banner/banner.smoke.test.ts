import { render, type TemplateResult } from 'lit';
import { afterEach, describe, expect, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import * as storyModule from './banner.stories';

/**
 * Two checks that a story `play` function cannot do, run on the initial render of the same stories:
 *
 * 1. Tab order with REAL key events. `userEvent.tab()` inside `play` (user-event) only walks the light
 *    DOM, so it cannot cross a shadow root. Vitest's browser `userEvent` sends real keys through
 *    Playwright, which do. A story opts in with `parameters.tabOrder` (a list of accessible names).
 * 2. Visual smoke: one screenshot per story, uploaded by CI as an artifact for human review.
 *    This is NOT a visual regression gate (no baselines, no diffing).
 *
 * Stories are rendered through their own `render` and merged args, so scenarios are not duplicated.
 * `play`, axe and everything else is covered by the `storybook` project.
 */

type StoryRender = (args: Record<string, unknown>, context: never) => TemplateResult;
interface StoryLike {
  args?: Record<string, unknown>;
  render?: StoryRender;
  parameters?: { tabOrder?: string[] };
}

const { default: meta, ...stories } = storyModule as unknown as { default: StoryLike } & Record<string, StoryLike>;

/** Accessible name of the element that really has focus, descending into open shadow roots. */
const focusedName = (): string | null => {
  let el: Element | null = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  if (!el || el === document.body) return null;
  return el.getAttribute('aria-label') ?? el.textContent?.trim() ?? null;
};

let root: HTMLElement | undefined;

/** Renders a story into a fresh container and waits until every <post-banner> has rendered. */
const mount = async (story: StoryLike): Promise<HTMLElement> => {
  const renderStory = story.render ?? meta.render;
  if (!renderStory) throw new Error('Story has no render function');
  root = document.createElement('div');
  // Same padding as Storybook's `layout: 'padded'`, so screenshots match what reviewers see there.
  root.style.padding = '1rem';
  document.body.append(root);
  render(renderStory({ ...meta.args, ...story.args }, {} as never), root);
  const banners = Array.from(root.querySelectorAll('post-banner'));
  await expect.poll(() => banners.every((el) => el.classList.contains('hydrated'))).toBe(true);
  return root;
};

afterEach(() => {
  root?.remove();
  root = undefined;
});

describe.each(Object.entries(stories))('%s', (name, story) => {
  test('visual smoke screenshot', async () => {
    const container = await mount(story);
    await page.screenshot({ element: container, path: `../../../screenshots/${name}.png` });
  });

  const tabOrder = story.parameters?.tabOrder;
  if (tabOrder) {
    test('tab order follows the DOM, with real key events', async () => {
      await mount(story);
      const seen: Array<string | null> = [];
      for (let i = 0; i < tabOrder.length; i += 1) {
        await userEvent.tab();
        seen.push(focusedName());
      }
      expect(seen).toEqual(tabOrder);
    });
  }
});
