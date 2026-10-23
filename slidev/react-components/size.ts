import type { Responsive } from './responsive.ts';

import { toResponsiveClasses } from './responsive.ts';

export const SpacingValue = Object.freeze({
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  Px: 'px',
} as const);
export type SpacingType = (typeof SpacingValue)[keyof typeof SpacingValue];

export const PaddingValue = Object.freeze({
  ...SpacingValue,
  0.5: 0.5,
  1.5: 1.5,
  2.5: 2.5,
  3.5: 3.5,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  36: 36,
  40: 40,
  44: 44,
  48: 48,
  52: 52,
  56: 56,
  60: 60,
  64: 64,
  72: 72,
  80: 80,
  96: 96,
} as const);
export type PaddingType = (typeof PaddingValue)[keyof typeof PaddingValue];

export const MarginValue = Object.freeze({
  ...PaddingValue,
  Auto: 'auto',
} as const);
export type MarginType = (typeof MarginValue)[keyof typeof MarginValue];

export const BasisValue = Object.freeze({
  ...MarginValue,
  '1/2': '1/2',
  '1/3': '1/3',
  '1/4': '1/4',
  '1/5': '1/5',
  '1/6': '1/6',
  '1/12': '1/12',
  '2/3': '2/3',
  '2/4': '2/4',
  '2/5': '2/5',
  '2/6': '2/6',
  '2/12': '2/12',
  '3/4': '3/4',
  '3/5': '3/5',
  '3/6': '3/6',
  '3/12': '3/12',
  '4/5': '4/5',
  '4/6': '4/6',
  '4/12': '4/12',
  '5/6': '5/6',
  '5/12': '5/12',
  '6/12': '6/12',
  '7/12': '7/12',
  '8/12': '8/12',
  '9/12': '9/12',
  '10/12': '10/12',
  '11/12': '11/12',
  'full': 'full',
} as const);
export type BasisType = (typeof BasisValue)[keyof typeof BasisValue];

export const SizeValue = Object.freeze({
  ...BasisValue,
  Fit: 'fit',
  Max: 'max',
  Min: 'min',
  Screen: 'screen',
} as const);
export type SizeType = (typeof SizeValue)[keyof typeof SizeValue];

export const ComponentSize = Object.freeze({
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const);
export type ComponentSizeType =
  (typeof ComponentSize)[keyof typeof ComponentSize];

export const ComponentSizeWithXl = Object.freeze({
  ...ComponentSize,
  XLarge: 'xl',
} as const);
export type ComponentSizeWithXlType =
  (typeof ComponentSizeWithXl)[keyof typeof ComponentSizeWithXl];

export interface HeightProps {
  height?: Responsive<SizeType> | undefined;
  maxHeight?: Responsive<SizeType> | undefined;
  minHeight?: Responsive<SizeType> | undefined;
}

export interface MarginProps {
  margin?: Responsive<MarginType> | undefined;
  marginBottom?: Responsive<MarginType> | undefined;
  marginLeft?: Responsive<MarginType> | undefined;
  marginRight?: Responsive<MarginType> | undefined;
  marginTop?: Responsive<MarginType> | undefined;
  marginX?: Responsive<MarginType> | undefined;
  marginY?: Responsive<MarginType> | undefined;
}

export interface PaddingProps {
  padding?: Responsive<PaddingType> | undefined;
  paddingBottom?: Responsive<PaddingType> | undefined;
  paddingLeft?: Responsive<PaddingType> | undefined;
  paddingRight?: Responsive<PaddingType> | undefined;
  paddingTop?: Responsive<PaddingType> | undefined;
  paddingX?: Responsive<PaddingType> | undefined;
  paddingY?: Responsive<PaddingType> | undefined;
}

export interface WidthProps {
  maxWidth?: Responsive<SizeType> | undefined;
  minWidth?: Responsive<SizeType> | undefined;
  width?: Responsive<SizeType> | undefined;
}

export function generateHeight(
  breakpointsValues?: Responsive<SizeType>,
): Array<string> {
  return toResponsiveClasses<SizeType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'h'),
  });
}

export function generateHeightClasses(props: HeightProps): Array<string> {
  return [
    ...generateHeight(props.height),
    ...generateMinHeight(props.minHeight),
    ...generateMaxHeight(props.maxHeight),
  ];
}

export function generateMargin(
  breakpointsValues?: Responsive<MarginType>,
): Array<string> {
  return toResponsiveClasses<MarginType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'm'),
  });
}

export function generateMarginBottom(
  breakpointsValues?: Responsive<MarginType>,
): Array<string> {
  return toResponsiveClasses<MarginType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'mb'),
  });
}

export function generateMarginClasses(props: MarginProps): Array<string> {
  return [
    ...generateMargin(props.margin),
    ...generateMarginX(props.marginX),
    ...generateMarginY(props.marginY),
    ...generateMarginTop(props.marginTop),
    ...generateMarginRight(props.marginRight),
    ...generateMarginBottom(props.marginBottom),
    ...generateMarginLeft(props.marginLeft),
  ];
}

export function generateMarginLeft(
  breakpointsValues?: Responsive<MarginType>,
): Array<string> {
  return toResponsiveClasses<MarginType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'ml'),
  });
}

export function generateMarginRight(
  breakpointsValues?: Responsive<MarginType>,
): Array<string> {
  return toResponsiveClasses<MarginType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'mr'),
  });
}

export function generateMarginTop(
  breakpointsValues?: Responsive<MarginType>,
): Array<string> {
  return toResponsiveClasses<MarginType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'mt'),
  });
}

export function generateMarginX(
  breakpointsValues?: Responsive<MarginType>,
): Array<string> {
  return toResponsiveClasses<MarginType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'mx'),
  });
}

export function generateMarginY(
  breakpointsValues?: Responsive<MarginType>,
): Array<string> {
  return toResponsiveClasses<MarginType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'my'),
  });
}

export function generateMaxHeight(
  breakpointsValues?: Responsive<SizeType>,
): Array<string> {
  return toResponsiveClasses<SizeType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'max-h'),
  });
}

export function generateMaxWidth(
  breakpointsValues?: Responsive<SizeType>,
): Array<string> {
  return toResponsiveClasses<SizeType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'max-w'),
  });
}

export function generateMinHeight(
  breakpointsValues?: Responsive<SizeType>,
): Array<string> {
  return toResponsiveClasses<SizeType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'min-h'),
  });
}

export function generateMinWidth(
  breakpointsValues?: Responsive<SizeType>,
): Array<string> {
  return toResponsiveClasses<SizeType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'min-w'),
  });
}

export function generatePadding(
  breakpointsValues?: Responsive<PaddingType>,
): Array<string> {
  return toResponsiveClasses<PaddingType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'p'),
  });
}

export function generatePaddingBottom(
  breakpointsValues?: Responsive<PaddingType>,
): Array<string> {
  return toResponsiveClasses<PaddingType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'pb'),
  });
}

export function generatePaddingClasses(props: PaddingProps): Array<string> {
  return [
    ...generatePadding(props.padding),
    ...generatePaddingX(props.paddingX),
    ...generatePaddingY(props.paddingY),
    ...generatePaddingTop(props.paddingTop),
    ...generatePaddingRight(props.paddingRight),
    ...generatePaddingBottom(props.paddingBottom),
    ...generatePaddingLeft(props.paddingLeft),
  ];
}

export function generatePaddingLeft(
  breakpointsValues?: Responsive<PaddingType>,
): Array<string> {
  return toResponsiveClasses<PaddingType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'pl'),
  });
}

export function generatePaddingRight(
  breakpointsValues?: Responsive<PaddingType>,
): Array<string> {
  return toResponsiveClasses<PaddingType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'px'),
  });
}

export function generatePaddingTop(
  breakpointsValues?: Responsive<PaddingType>,
): Array<string> {
  return toResponsiveClasses<PaddingType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'pt'),
  });
}

export function generatePaddingX(
  breakpointsValues?: Responsive<PaddingType>,
): Array<string> {
  return toResponsiveClasses<PaddingType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'px'),
  });
}

export function generatePaddingY(
  breakpointsValues?: Responsive<PaddingType>,
): Array<string> {
  return toResponsiveClasses<PaddingType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'py'),
  });
}

export function generateSize(
  breakpointsValues?: Responsive<SizeType>,
): Array<string> {
  return toResponsiveClasses<SizeType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'size'),
  });
}

export function generateWidth(
  breakpointsValues?: Responsive<SizeType>,
): Array<string> {
  return toResponsiveClasses<SizeType>({
    breakpointsValues,
    getClass: (v) => sizeToClass(v, 'w'),
  });
}

export function generateWidthClasses(props: WidthProps): Array<string> {
  return [
    ...generateWidth(props.width),
    ...generateMinWidth(props.minWidth),
    ...generateMaxWidth(props.maxWidth),
  ];
}

export function sizeToClass(
  value: BasisType | MarginType | PaddingType | SizeType | SpacingType,
  prefix:
    | 'basis'
    | 'gap'
    | 'gap-x'
    | 'gap-y'
    | 'h'
    | 'm'
    | 'max-h'
    | 'max-w'
    | 'mb'
    | 'min-h'
    | 'min-w'
    | 'ml'
    | 'mr'
    | 'mt'
    | 'mx'
    | 'my'
    | 'p'
    | 'pb'
    | 'pl'
    | 'pr'
    | 'pt'
    | 'px'
    | 'py'
    | 'size'
    | 'w',
): string {
  return `${prefix}-${value}`;
}

export function useHeightClasses({
  height,
  maxHeight,
  minHeight,
}: HeightProps) {
  return [
    ...generateHeight(height),
    ...generateMaxHeight(maxHeight),
    ...generateMinHeight(minHeight),
  ];
}

export function useMarginClasses({
  margin,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginX,
  marginY,
}: MarginProps) {
  return [
    ...generateMargin(margin),
    ...generateMarginX(marginX),
    ...generateMarginY(marginY),
    ...generateMarginTop(marginTop),
    ...generateMarginRight(marginRight),
    ...generateMarginBottom(marginBottom),
    ...generateMarginLeft(marginLeft),
  ];
}

export function usePaddingClasses({
  padding,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingX,
  paddingY,
}: PaddingProps) {
  return [
    ...generatePadding(padding),
    ...generatePaddingX(paddingX),
    ...generatePaddingY(paddingY),
    ...generatePaddingTop(paddingTop),
    ...generatePaddingRight(paddingRight),
    ...generatePaddingBottom(paddingBottom),
    ...generatePaddingLeft(paddingLeft),
  ];
}

export function useWidthClasses({ maxWidth, minWidth, width }: WidthProps) {
  return [
    ...generateWidth(width),
    ...generateMaxWidth(maxWidth),
    ...generateMinWidth(minWidth),
  ];
}
