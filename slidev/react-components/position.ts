import type { Responsive } from './responsive';
import type { MarginType } from './size';

import { toResponsiveClasses } from './responsive';

export type DisplayType =
  | 'block'
  | 'flex'
  | 'grid'
  | 'hidden'
  | 'inline'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'inline-table'
  | 'none'
  | 'table';
export type DistanceType =
  '1/2' | '1/3' | '1/4' | '2/3' | '2/4' | '3/4' | 'full' | MarginType;
export type IsolateType = boolean;
export type PositionType =
  'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
export type VerticalAlignType =
  | 'baseline'
  | 'bottom'
  | 'middle'
  | 'sub'
  | 'super'
  | 'text-bottom'
  | 'text-top'
  | 'top';
export type VisibilityType = 'collapse' | 'invisible' | 'visible';

export function generateBottom(
  breakpointsValues?: Responsive<DistanceType>,
): Array<string> {
  return toResponsiveClasses<DistanceType>({
    breakpointsValues,
    getClass: (v) => distanceToClass(v, 'bottom'),
  });
}

export function generateDisplay(
  breakpointsValues?: Responsive<DisplayType>,
): Array<string> {
  return toResponsiveClasses<DisplayType>({
    breakpointsValues,
    getClass: (v) => v,
  });
}

export function generateInset(
  breakpointsValues?: Responsive<DistanceType>,
): Array<string> {
  return toResponsiveClasses<DistanceType>({
    breakpointsValues,
    getClass: (v) => distanceToClass(v, 'inset'),
  });
}

export function generateInsetX(
  breakpointsValues?: Responsive<DistanceType>,
): Array<string> {
  return toResponsiveClasses<DistanceType>({
    breakpointsValues,
    getClass: (v) => distanceToClass(v, 'inset-x'),
  });
}

export function generateInsetY(
  breakpointsValues?: Responsive<DistanceType>,
): Array<string> {
  return toResponsiveClasses<DistanceType>({
    breakpointsValues,
    getClass: (v) => distanceToClass(v, 'inset-y'),
  });
}

export function generateIsolation(
  breakpointsValues?: Responsive<IsolateType>,
): Array<string> {
  return toResponsiveClasses<IsolateType>({
    breakpointsValues,
    getClass: (v) => (v ? 'isolate' : 'isolate-auto'),
  });
}

export function generateLeft(
  breakpointsValues?: Responsive<DistanceType>,
): Array<string> {
  return toResponsiveClasses<DistanceType>({
    breakpointsValues,
    getClass: (v) => distanceToClass(v, 'left'),
  });
}

export function generatePosition(
  breakpointsValues?: Responsive<PositionType>,
): Array<string> {
  return toResponsiveClasses<PositionType>({
    breakpointsValues,
    getClass: (v) => v,
  });
}

export function generateRight(
  breakpointsValues?: Responsive<DistanceType>,
): Array<string> {
  return toResponsiveClasses<DistanceType>({
    breakpointsValues,
    getClass: (v) => distanceToClass(v, 'right'),
  });
}

export function generateTop(
  breakpointsValues?: Responsive<DistanceType>,
): Array<string> {
  return toResponsiveClasses<DistanceType>({
    breakpointsValues,
    getClass: (v) => distanceToClass(v, 'top'),
  });
}

export function generateVerticalAlign(
  breakpointsValues?: Responsive<VerticalAlignType>,
): Array<string> {
  return toResponsiveClasses<VerticalAlignType>({
    breakpointsValues,
    getClass: (v) => alignToClass(v),
  });
}

export function generateVisibility(
  breakpointsValues?: Responsive<VisibilityType>,
): Array<string> {
  return toResponsiveClasses<VisibilityType>({
    breakpointsValues,
    getClass: (v) => v,
  });
}

function alignToClass(value: VerticalAlignType): string {
  return `align-${value}`;
}

function distanceToClass(
  value: DistanceType,
  prefix: 'bottom' | 'inset' | 'inset-x' | 'inset-y' | 'left' | 'right' | 'top',
): string {
  return `${prefix}-${value}`;
}
