import { Build, Component, Element, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import {
  POST_BANNER_ANNOUNCE,
  POST_BANNER_HEADING_LEVELS,
  POST_BANNER_VARIANTS,
  PostBannerAnnounce,
  PostBannerCtaDetail,
  PostBannerCtaTarget,
  PostBannerDismissDetail,
  PostBannerHeadingLevel,
  PostBannerVariant,
} from './types';

const ICONS: Record<PostBannerVariant, string> = {
  info: 'i',
  success: '✓',
  // U+FE0E forces text presentation so the glyph inherits the banner colour instead of rendering as a colour emoji.
  warning: '⚠︎',
  error: '!',
};

/** Returns `value` when it is one of `allowed`, otherwise `fallback`. Attributes arrive as arbitrary strings. */
const pick = <T extends string>(allowed: readonly T[], value: unknown, fallback: T): T =>
  allowed.indexOf(value as T) !== -1 ? (value as T) : fallback;

/**
 * Persistent contextual message (info, warning, success, error) with an optional call to action
 * and an optional close button.
 *
 * @slot title - Short, specific heading. Recommended: it names the message for assistive technology.
 * @slot - Description or context. Accepts text and inline markup.
 * @slot actions - Consumer-provided actions for advanced cases. Prefer a single primary action.
 */
@Component({
  tag: 'post-banner',
  styleUrl: 'banner.css',
  shadow: true,
})
export class PostBanner {
  @Element() el!: HTMLElement;

  /** Tone and semantics of the message. Unknown values fall back to `info`. */
  @Prop() variant: PostBannerVariant = 'info';

  /** Shows a close button. Off by default so an important message cannot vanish silently. */
  @Prop() dismissible = false;

  /**
   * Whether the banner is shown. Dismissing sets it to `false`; a parent can reopen by setting it back to `true`.
   * In markup, close with `open="false"` (a boolean attribute that defaults to `true` cannot be removed to close it).
   */
  @Prop({ mutable: true, reflect: true }) open = true;

  /** Label of the built-in call to action. Not rendered when empty. Make it explicit ("Review your invoice", not "Click here"). */
  @Prop() ctaLabel?: string;

  /** URL of the built-in call to action. When absent the call to action is a `<button>`, otherwise an `<a>`. */
  @Prop() ctaHref?: string;

  /** Link target of the call to action. `_blank` adds `rel="noopener noreferrer"`; say so in `ctaLabel`. */
  @Prop() ctaTarget: PostBannerCtaTarget = '_self';

  /** Heading level rendered for the title, to fit the page outline. */
  @Prop() headingLevel: PostBannerHeadingLevel = '2';

  /**
   * How assistive technology announces the banner. `status` is polite; `alert` interrupts and is reserved for
   * urgent, unexpected changes. It is NOT derived from `variant`: a persistent validation error is usually a `status`.
   * Live regions announce changes, so a banner already on the page at load is not announced.
   */
  @Prop() announce: PostBannerAnnounce = 'status';

  /** Accessible name. Takes priority over the title; use it when the visible title alone is not enough. */
  @Prop() label?: string;

  /** Accessible name of the close button. Provide the translation for the page language. */
  @Prop() closeLabel = 'Close';

  /** Emitted after the user closes the banner. Move focus here if your layout needs it: the banner does not. */
  @Event({ bubbles: true, composed: true }) postBannerDismiss!: EventEmitter<PostBannerDismissDetail>;

  /** Emitted when the built-in call to action is activated, before any navigation. */
  @Event({ bubbles: true, composed: true }) postBannerCta!: EventEmitter<PostBannerCtaDetail>;

  @State() private hasTitle = false;
  @State() private hasActions = false;

  componentWillLoad(): void {
    this.syncSlots();
  }

  componentDidLoad(): void {
    if (Build.isDev && !this.hasTitle && !this.label) {
      console.warn(
        '<post-banner> has neither a [slot="title"] nor a `label`: the message has no accessible heading or name.',
        this.el,
      );
    }
  }

  private syncSlots = (): void => {
    this.hasTitle = this.el.querySelector(':scope > [slot="title"]') !== null;
    this.hasActions = this.el.querySelector(':scope > [slot="actions"]') !== null;
  };

  private dismiss = (): void => {
    this.open = false;
    this.postBannerDismiss.emit({ reason: 'close-button' });
  };

  private handleCtaClick = (): void => {
    this.postBannerCta.emit({ href: this.ctaHref });
  };

  private renderCta() {
    if (!this.ctaLabel) return null;

    if (this.ctaHref) {
      const target = pick(['_self', '_blank'] as const, this.ctaTarget, '_self');
      return (
        <a
          class="swisspost:cta"
          href={this.ctaHref}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          onClick={this.handleCtaClick}
        >
          {this.ctaLabel}
        </a>
      );
    }

    return (
      <button class="swisspost:cta" type="button" onClick={this.handleCtaClick}>
        {this.ctaLabel}
      </button>
    );
  }

  render() {
    const variant = pick(POST_BANNER_VARIANTS, this.variant, 'info');
    const announce = pick(POST_BANNER_ANNOUNCE, this.announce, 'status');
    const Heading = `h${pick(POST_BANNER_HEADING_LEVELS, this.headingLevel, '2')}` as 'h2';

    return (
      <Host data-variant={variant} hidden={!this.open}>
        {this.open && (
          <section
            class="swisspost:banner"
            role={announce}
            aria-label={this.label || undefined}
            aria-labelledby={!this.label && this.hasTitle ? 'post-banner-title' : undefined}
          >
            <div class="swisspost:icon" aria-hidden="true">
              {ICONS[variant]}
            </div>
            <div class="swisspost:content">
              {/* Always rendered so slotchange fires when a title is added later; hidden (and out of the a11y tree) while empty. */}
              <Heading id="post-banner-title" class="swisspost:title" hidden={!this.hasTitle}>
                <slot name="title" onSlotchange={this.syncSlots} />
              </Heading>
              <div class="swisspost:description">
                <slot />
              </div>
              <div class="swisspost:actions" hidden={!this.ctaLabel && !this.hasActions}>
                {this.renderCta()}
                <slot name="actions" onSlotchange={this.syncSlots} />
              </div>
            </div>
            {this.dismissible && (
              <button class="swisspost:close" type="button" onClick={this.dismiss}>
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </section>
        )}
      </Host>
    );
  }
}
