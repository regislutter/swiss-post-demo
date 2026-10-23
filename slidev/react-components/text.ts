import type { Responsive } from './responsive';

import { toResponsiveClasses } from './responsive';

export type LineClampType = 1 | 2 | 3 | 4 | 5 | 6 | 'none';
export type TextAlignType =
  'center' | 'end' | 'justify' | 'left' | 'right' | 'start';
export type TextOverflowType = 'clip' | 'ellipsis' | 'truncate';
export interface TextProps {
  lineClamp?: Responsive<LineClampType> | undefined;
  textAlign?: Responsive<TextAlignType> | undefined;
  textOverflow?: Responsive<TextOverflowType> | undefined;
  textTransform?: Responsive<TextTransformType> | undefined;
  textWrap?: Responsive<TextWrapType> | undefined;
  whitespace?: Responsive<WhitespaceType> | undefined;
  wordBreak?: Responsive<WordBreakType> | undefined;
}
export type TextTransformType =
  'capitalize' | 'lowercase' | 'normal-case' | 'uppercase';
export type TextWrapType = 'balance' | 'normal' | 'nowrap' | 'pretty';
export type WhitespaceType =
  'break-spaces' | 'normal' | 'nowrap' | 'pre' | 'pre-line' | 'pre-wrap';

export type WordBreakType = 'all' | 'keep' | 'normal' | 'words';

export function generateLineClamp(
  breakpointsValues?: Responsive<LineClampType>,
): Array<string> {
  return toResponsiveClasses<LineClampType>({
    breakpointsValues,
    getClass: (v) => lineClampToClass(v),
  });
}

export function generateTextAlign(
  breakpointsValues?: Responsive<TextAlignType>,
): Array<string> {
  return toResponsiveClasses<TextAlignType>({
    breakpointsValues,
    getClass: (v) => textToClass(v),
  });
}

export function generateTextOverflow(
  breakpointsValues?: Responsive<TextOverflowType>,
): Array<string> {
  return toResponsiveClasses<TextOverflowType>({
    breakpointsValues,
    getClass: (v: TextOverflowType) => {
      return v === 'truncate' ? v : textToClass(v);
    },
  });
}

export function generateTextTransform(
  breakpointsValues?: Responsive<TextTransformType>,
): Array<string> {
  return toResponsiveClasses<TextTransformType>({
    breakpointsValues,
    getClass: (v) => v,
  });
}

export function generateTextWrap(
  breakpointsValues?: Responsive<TextWrapType>,
): Array<string> {
  return toResponsiveClasses<TextWrapType>({
    breakpointsValues,
    getClass: (v) => textToClass(v),
  });
}

export function generateWhitespace(
  breakpointsValues?: Responsive<WhitespaceType>,
): Array<string> {
  return toResponsiveClasses<WhitespaceType>({
    breakpointsValues,
    getClass: (v) => whitespaceToClass(v),
  });
}

export function generateWordBreak(
  breakpointsValues?: Responsive<WordBreakType>,
): Array<string> {
  return toResponsiveClasses<WordBreakType>({
    breakpointsValues,
    getClass: (v) => wordBreakToClass(v),
  });
}

function lineClampToClass(value: LineClampType): string {
  return `line-clamp-${value}`;
}

function textToClass(
  value: TextAlignType | TextOverflowType | TextWrapType,
): string {
  return `text-${value}`;
}

function whitespaceToClass(value: WhitespaceType): string {
  return `whitespace-${value}`;
}

function wordBreakToClass(value: WordBreakType): string {
  return `break-${value}`;
}

export const generateTextClasses = ({
  lineClamp,
  textAlign,
  textOverflow,
  textTransform,
  textWrap,
  whitespace,
  wordBreak,
}: TextProps) => [
  ...generateWordBreak(wordBreak),
  ...generateTextAlign(textAlign),
  ...generateLineClamp(lineClamp),
  ...generateWhitespace(whitespace),
  ...generateTextTransform(textTransform),
  ...generateTextOverflow(textOverflow),
  ...generateTextWrap(textWrap),
];
