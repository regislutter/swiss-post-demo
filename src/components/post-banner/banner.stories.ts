import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html, nothing, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { expect, fn, userEvent, waitFor, within, type Mock } from 'storybook/test';
import { findAllByShadowRole, findByShadowRole, queryByShadowRole } from 'shadow-dom-testing-library';
import type { PostBannerAnnounce, PostBannerHeadingLevel, PostBannerVariant } from './types';

/**
 * Stories are the executable contract: each `play` asserts one observable invariant by role and accessible
 * name (never by internal class), and the CI runner then audits the final DOM with axe.
 *
 * Queries come from shadow-dom-testing-library because Testing Library does not pierce shadow roots.
 * Tab order is asserted in `.storybook/test-runner.ts` (`parameters.tabOrder`) with real key events.
 */
interface BannerArgs {
  variant: PostBannerVariant;
  announce: PostBannerAnnounce;
  headingLevel?: PostBannerHeadingLevel;
  dismissible: boolean;
  open: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  closeLabel?: string;
  label?: string;
  title?: string;
  description: string;
  onPostBannerDismiss?: Mock;
  onPostBannerCta?: Mock;
}

type BannerHost = HTMLElement & { open: boolean };

const renderBanner = (args: BannerArgs): TemplateResult => html`
  <post-banner
    variant=${args.variant}
    announce=${args.announce}
    heading-level=${ifDefined(args.headingLevel)}
    ?dismissible=${args.dismissible}
    .open=${args.open}
    cta-label=${ifDefined(args.ctaLabel)}
    cta-href=${ifDefined(args.ctaHref)}
    close-label=${ifDefined(args.closeLabel)}
    label=${ifDefined(args.label)}
    @postBannerDismiss=${args.onPostBannerDismiss}
    @postBannerCta=${args.onPostBannerCta}
  >
    ${args.title ? html`<span slot="title">${args.title}</span>` : nothing} ${args.description}
  </post-banner>
`;

const meta = {
  title: 'Feedback/PostBanner',
  component: 'post-banner',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['info', 'warning', 'success', 'error'] },
    announce: { control: 'inline-radio', options: ['status', 'alert'] },
    headingLevel: { control: 'select', options: ['2', '3', '4', '5', '6'] },
    dismissible: { control: 'boolean' },
    open: { control: 'boolean' },
    ctaLabel: { control: 'text' },
    ctaHref: { control: 'text' },
    closeLabel: { control: 'text' },
    label: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    variant: 'info',
    announce: 'status',
    dismissible: false,
    open: true,
    title: 'Information',
    description: 'Your request is being processed.',
    onPostBannerDismiss: fn(),
    onPostBannerCta: fn(),
  },
  render: renderBanner,
} satisfies Meta<BannerArgs>;

export default meta;
type Story = StoryObj<BannerArgs>;

const getHost = (canvasElement: HTMLElement): BannerHost => {
  const host = canvasElement.querySelector('post-banner');
  if (!host) throw new Error('<post-banner> is missing from the story');
  return host as BannerHost;
};

const detailOf = (mock: Mock | undefined, call = 0): unknown => (mock?.mock.calls[call]?.[0] as CustomEvent | undefined)?.detail;

/**
 * The close button, found by role and its visible glyph rather than by accessible name: the behaviour stories
 * must not depend on the label, which axe (`button-name`) and the tab-order smoke test already audit.
 */
const findCloseButton = async (host: HTMLElement): Promise<HTMLElement> => {
  const buttons = await findAllByShadowRole(host, 'button');
  const close = buttons.find((button) => button.textContent?.trim() === '×');
  if (!close) throw new Error('No close button (role=button, text "×") in <post-banner>');
  return close;
};

/** Every rendered class carries the `swisspost:` prefix (library convention). */
const expectPrefixedClasses = (host: HTMLElement): void => {
  const classes = Array.from(host.shadowRoot?.querySelectorAll('[class]') ?? []).flatMap((el) => Array.from(el.classList));
  expect(classes.length).toBeGreaterThan(0);
  expect(classes.filter((name) => !name.startsWith('swisspost:'))).toEqual([]);
};

export const Info: Story = {
  args: { ctaLabel: 'Learn more', ctaHref: '#details' },
  parameters: { tabOrder: ['Learn more'] },
  play: async ({ canvasElement, args }) => {
    const host = getHost(canvasElement);

    // Role and accessible name come from the slotted title through aria-labelledby.
    const region = await findByShadowRole(host, 'status', { name: 'Information' });
    await expect(region).toBeVisible();
    expectPrefixedClasses(host);

    // With an href the CTA is a real link; activating it reports the destination.
    const link = await findByShadowRole(host, 'link', { name: 'Learn more' });
    await expect(link).toHaveAttribute('href', '#details');
    await userEvent.click(link);
    await expect(args.onPostBannerCta).toHaveBeenCalledTimes(1);
    expect(detailOf(args.onPostBannerCta)).toEqual({ href: '#details' });
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    dismissible: true,
    title: 'Action required soon',
    description: 'Update your preferences before the deadline.',
    ctaLabel: 'Review preferences',
  },
  // CTA first, close button last: DOM order is the tab order.
  parameters: { tabOrder: ['Review preferences', 'Close'] },
};

export const WarningDismissible: Story = {
  args: { variant: 'warning', dismissible: true, title: 'Action required soon', description: 'Update your preferences before the deadline.' },
  play: async ({ canvasElement, args }) => {
    const host = getHost(canvasElement);
    const close = await findCloseButton(host);
    await expect(close).toBeVisible();

    // Focus is on the real inner button (document.activeElement alone would only report the host).
    close.focus();
    expect(host.shadowRoot?.activeElement).toBe(close);

    await userEvent.keyboard('{Enter}');

    await waitFor(() => expect(host).not.toBeVisible());
    expect(queryByShadowRole(host, 'status')).toBeNull();
    await expect(args.onPostBannerDismiss).toHaveBeenCalledTimes(1);
    expect(detailOf(args.onPostBannerDismiss)).toEqual({ reason: 'close-button' });
    await expect(host).toHaveAttribute('hidden');
  },
};

export const Success: Story = {
  args: { variant: 'success', dismissible: true, title: 'Changes saved', description: 'Your changes have been applied.' },
  parameters: { tabOrder: ['Close'] },
};

export const ErrorUrgent: Story = {
  args: {
    variant: 'error',
    announce: 'alert',
    title: 'Sending failed',
    description: 'An error prevented your request from being completed.',
    ctaLabel: 'Try again',
  },
  parameters: { tabOrder: ['Try again'] },
  play: async ({ canvasElement, args }) => {
    const host = getHost(canvasElement);
    // `announce` is chosen by the product; it is not derived from the variant.
    await findByShadowRole(host, 'alert', { name: 'Sending failed' });
    expect(queryByShadowRole(host, 'status')).toBeNull();

    // Without an href the CTA is a button.
    const cta = await findByShadowRole(host, 'button', { name: 'Try again' });
    await userEvent.click(cta);
    await expect(args.onPostBannerCta).toHaveBeenCalledTimes(1);
    expect(detailOf(args.onPostBannerCta)).toEqual({});
  },
};

export const SlottedActions: Story = {
  args: { dismissible: true, title: 'Two choices available', description: 'The actions slot supports richer business cases.' },
  parameters: { tabOrder: ['Accept', 'Later', 'Close'] },
  render: (args) => html`
    <post-banner variant=${args.variant} ?dismissible=${args.dismissible}>
      <span slot="title">${args.title}</span>
      ${args.description}
      <button type="button" slot="actions">Accept</button>
      <button type="button" slot="actions">Later</button>
    </post-banner>
  `,
};

export const LabelOnly: Story = {
  name: 'Label instead of title',
  args: { title: undefined, label: 'Maintenance notice', description: 'Scheduled maintenance on Saturday between 02:00 and 04:00.' },
  play: async ({ canvasElement }) => {
    const host = getHost(canvasElement);
    // `label` names the region; the unused heading stays out of the accessibility tree.
    await findByShadowRole(host, 'status', { name: 'Maintenance notice' });
    expect(queryByShadowRole(host, 'heading')).toBeNull();
  },
};

export const LongCopy: Story = {
  args: {
    variant: 'warning',
    dismissible: true,
    ctaLabel: 'Review the billing settings of your organisation',
    title: 'A deliberately long title that has to wrap on a narrow container without clipping',
    description:
      'Long copy and an unbroken string must reflow instead of overflowing: https://example.com/a/very/long/path/with/no/natural/break/points/at/all/0123456789',
  },
  render: (args) => html`<div style="max-inline-size: 20rem">${renderBanner(args)}</div>`,
  play: async ({ canvasElement }) => {
    const host = getHost(canvasElement);
    const region = await findByShadowRole(host, 'status');
    // No horizontal overflow: content reflows (WCAG 1.4.10).
    expect(region.scrollWidth).toBeLessThanOrEqual(region.clientWidth);
  },
};

const MATRIX: Array<Pick<BannerArgs, 'variant' | 'title' | 'description' | 'ctaLabel'>> = [
  { variant: 'info', title: 'Information', description: 'Your request is being processed.', ctaLabel: 'View details' },
  { variant: 'warning', title: 'Action required soon', description: 'Update your preferences before the deadline.', ctaLabel: 'Review settings' },
  { variant: 'success', title: 'Changes saved', description: 'Your changes have been applied.', ctaLabel: 'View receipt' },
  { variant: 'error', title: 'Sending failed', description: 'An error prevented your request from being completed.', ctaLabel: 'Try again' },
];

const renderMatrix = (args: BannerArgs): TemplateResult => html`
  <div style="display: grid; gap: 1rem">
    ${MATRIX.map((entry) => renderBanner({ ...args, ...entry, dismissible: true }))}
  </div>
`;

const MATRIX_TAB_ORDER = MATRIX.flatMap((entry) => [entry.ctaLabel as string, 'Close']);

export const AllVariants: Story = {
  render: renderMatrix,
  parameters: { tabOrder: MATRIX_TAB_ORDER },
};

export const Themed: Story = {
  name: 'Themed (semantic tokens only)',
  // Only the semantic --post-feedback-* layer is remapped, via [data-theme='alt']; the component is untouched.
  render: (args) => html`<div data-theme="alt">${renderMatrix(args)}</div>`,
  parameters: { tabOrder: MATRIX_TAB_ORDER },
};

export const Reopen: Story = {
  args: { dismissible: true, title: 'Reopenable message', description: 'Dismissing sets open to false; a parent can set it back.' },
  render: (args) => html`
    ${renderBanner(args)}
    <button
      type="button"
      @click=${(event: Event) => {
        const host = (event.currentTarget as HTMLElement).parentElement?.querySelector<BannerHost>('post-banner');
        if (host) host.open = true;
      }}
    >
      Reopen the banner
    </button>
  `,
  play: async ({ canvasElement }) => {
    const host = getHost(canvasElement);
    const close = await findCloseButton(host);

    // Space activates a native button just as Enter does.
    close.focus();
    await userEvent.keyboard(' ');
    await waitFor(() => expect(host).not.toBeVisible());

    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Reopen the banner' }));
    await waitFor(() => expect(host).toBeVisible());
    await findCloseButton(host);
  },
};

export const DismissWithFocusReturn: Story = {
  args: { dismissible: true, title: 'Focus is the parent’s job', description: 'After dismissal the page decides where focus goes.' },
  render: (args) => html`
    ${renderBanner({
      ...args,
      // The banner never moves focus itself: the parent reacts to postBannerDismiss.
      onPostBannerDismiss: fn((event: Event) => {
        args.onPostBannerDismiss?.(event);
        (event.currentTarget as HTMLElement).parentElement?.querySelector<HTMLElement>('#next-section')?.focus();
      }),
    })}
    <h2 id="next-section" tabindex="-1">Next section</h2>
  `,
  play: async ({ canvasElement, args }) => {
    const host = getHost(canvasElement);
    const close = await findCloseButton(host);
    await userEvent.click(close);

    const next = within(canvasElement).getByRole('heading', { name: 'Next section' });
    await waitFor(() => expect(document.activeElement).toBe(next));
    await expect(args.onPostBannerDismiss).toHaveBeenCalledTimes(1);
  },
};
