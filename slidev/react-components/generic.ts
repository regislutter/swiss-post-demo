import type {
    ComponentProps,
    ComponentType,
    ReactElement,
    ReactNode,
  } from 'react';
  
  import { Children, isValidElement } from 'react';
  
  import type { OrderType } from './flex-grid.ts';
  import type {
    DisplayType,
    DistanceType,
    IsolateType,
    PositionType,
    VerticalAlignType,
    VisibilityType,
  } from './position.ts';
  import type { Responsive } from './responsive';
  
  import { generateOrder } from './flex-grid.ts';
  import {
    generateBottom,
    generateDisplay,
    generateInset,
    generateInsetX,
    generateInsetY,
    generateIsolation,
    generateLeft,
    generatePosition,
    generateRight,
    generateTop,
    generateVerticalAlign,
    generateVisibility,
  } from './position.ts';
  import { generateTextClasses, type TextProps } from './text.ts';
  
  export interface GenericProps extends TextProps {
    bottom?: Responsive<DistanceType> | undefined;
    display?: Responsive<DisplayType> | undefined;
    inset?: Responsive<DistanceType> | undefined;
    insetX?: Responsive<DistanceType> | undefined;
    insetY?: Responsive<DistanceType> | undefined;
    isolate?: Responsive<IsolateType> | undefined;
    left?: Responsive<DistanceType> | undefined;
    order?: Responsive<OrderType> | undefined;
    position?: Responsive<PositionType> | undefined;
    right?: Responsive<DistanceType> | undefined;
    top?: Responsive<DistanceType> | undefined;
    verticalAlign?: Responsive<VerticalAlignType> | undefined;
    visibility?: Responsive<VisibilityType> | undefined;
  }
  
  export type UIElementProps<
    T extends
      keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<unknown>,
  > = Omit<ComponentProps<T>, 'className'>;
  
  export const generateGenericClasses = ({
    bottom,
    display,
    inset,
    insetX,
    insetY,
    isolate,
    left,
    lineClamp,
    order,
    position,
    right,
    textAlign,
    textOverflow,
    textTransform,
    textWrap,
    top,
    verticalAlign,
    visibility,
    whitespace,
    wordBreak,
  }: GenericProps) => [
    ...generateDisplay(display),
    ...generatePosition(position),
    ...generateTop(top),
    ...generateRight(right),
    ...generateBottom(bottom),
    ...generateLeft(left),
    ...generateOrder(order),
    ...generateInset(inset),
    ...generateInsetX(insetX),
    ...generateInsetY(insetY),
    ...generateVisibility(visibility),
    ...generateVerticalAlign(verticalAlign),
    ...generateIsolation(isolate),
    ...generateTextClasses({
      lineClamp,
      textAlign,
      textOverflow,
      textTransform,
      textWrap,
      whitespace,
      wordBreak,
    }),
  ];
  
  export interface SlotIdentifiable {
    slotType?: symbol;
  }
  
  /**
   * Check if a React child matches a given component type.
   * Uses `Symbol.for`-based `slotType` when available (RSC-safe),
   * falls back to reference equality.
   */
  export function isSlotType<T>(
    child: unknown,
    componentType: ComponentType<T> & SlotIdentifiable,
  ): boolean {
    if (!isValidElement(child)) return false;
    const targetSymbol = componentType.slotType;
    return targetSymbol ? (child.type as SlotIdentifiable)?.slotType === targetSymbol : child.type === componentType;
  }
  
  export const findSlotsOfType = <T>(
    children: ReactNode,
    componentType: ComponentType<T> & SlotIdentifiable,
  ) => {
    const result: Array<ReactElement<T>> = [];
  
    Children.forEach(children, (child) => {
      if (isSlotType(child, componentType)) {
        result.push(child as ReactElement<T>);
      }
    });
    return result;
  };
  