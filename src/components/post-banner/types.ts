/**
 * Public types and allowed values for <post-banner>.
 * Kept outside banner.tsx: Stencil modules with @Component may only export the component class.
 */

export const POST_BANNER_VARIANTS = ['info', 'warning', 'success', 'error'] as const;
export type PostBannerVariant = (typeof POST_BANNER_VARIANTS)[number];

export const POST_BANNER_ANNOUNCE = ['status', 'alert'] as const;
export type PostBannerAnnounce = (typeof POST_BANNER_ANNOUNCE)[number];

export const POST_BANNER_HEADING_LEVELS = ['2', '3', '4', '5', '6'] as const;
export type PostBannerHeadingLevel = (typeof POST_BANNER_HEADING_LEVELS)[number];

export type PostBannerCtaTarget = '_self' | '_blank';

export interface PostBannerDismissDetail {
  reason: 'close-button';
}

export interface PostBannerCtaDetail {
  href?: string;
}
