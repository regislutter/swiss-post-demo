import type {
    BasisType,
    HeightProps,
    MarginProps,
    PaddingProps,
    SpacingType,
    WidthProps,
  } from './size';
  
  import { type Responsive, toResponsiveClasses } from './responsive';
  import { sizeToClass } from './size';
  
  const GridColumnsValue = Object.freeze({
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
  });
  
  export const JustifyContentValue = Object.freeze({
    Around: 'around',
    Between: 'between',
    Center: 'center',
    End: 'end',
    Evenly: 'evenly',
    Normal: 'normal',
    Start: 'start',
    Stretch: 'stretch',
  } as const);
  export const AlignContentValue = Object.freeze({
    ...JustifyContentValue,
    Baseline: 'baseline',
  } as const);
  export const PlaceContentValue = Object.freeze({
    ...AlignContentValue,
  } as const);
  
  export type AlignContentType =
    (typeof AlignContentValue)[keyof typeof AlignContentValue];
  export type JustifyContentType =
    (typeof JustifyContentValue)[keyof typeof JustifyContentValue];
  export type PlaceContentType =
    (typeof PlaceContentValue)[keyof typeof PlaceContentValue];
  
  export const JustifyItemsValue = Object.freeze({
    Center: 'center',
    End: 'end',
    Start: 'start',
    Stretch: 'stretch',
  } as const);
  export const AlignItemsValue = Object.freeze({
    ...JustifyItemsValue,
    Baseline: 'baseline',
  } as const);
  export const PlaceItemsValue = Object.freeze({
    ...AlignItemsValue,
  } as const);
  
  export type AlignItemsType =
    (typeof AlignItemsValue)[keyof typeof AlignItemsValue];
  export type JustifyItemsType =
    (typeof JustifyItemsValue)[keyof typeof JustifyItemsValue];
  export type PlaceItemsType =
    (typeof PlaceItemsValue)[keyof typeof PlaceItemsValue];
  
  export const JustifySelfValue = Object.freeze({
    ...JustifyItemsValue,
    Auto: 'auto',
  } as const);
  export const AlignSelfValue = Object.freeze({
    ...JustifySelfValue,
    Baseline: 'baseline',
  } as const);
  export const PlaceSelfValue = Object.freeze({
    ...JustifySelfValue,
  } as const);
  
  export type AlignSelfType =
    (typeof AlignSelfValue)[keyof typeof AlignSelfValue];
  export type JustifySelfType =
    (typeof JustifySelfValue)[keyof typeof JustifySelfValue];
  export type PlaceSelfType =
    (typeof PlaceSelfValue)[keyof typeof PlaceSelfValue];
  
  export const DirectionValue = Object.freeze({
    Col: 'col',
    ColReverse: 'col-reverse',
    Row: 'row',
    RowReverse: 'row-reverse',
  } as const);
  export const WrapValue = Object.freeze({
    NoWrap: 'nowrap',
    Wrap: 'wrap',
    WrapReverse: 'wrap-reverse',
  } as const);
  export const FlexValue = Object.freeze({
    1: 1,
    Auto: 'auto',
    Initial: 'initial',
    None: 'none',
  } as const);
  export const OrderValue = Object.freeze({
    None: 'none',
    ...GridColumnsValue,
    First: 'first',
    Last: 'last',
  } as const);
  
  export type DirectionType =
    (typeof DirectionValue)[keyof typeof DirectionValue];
  export type FlexType = (typeof FlexValue)[keyof typeof FlexValue];
  export type Grow = boolean;
  export type OrderType = (typeof OrderValue)[keyof typeof OrderValue];
  export type Shrink = boolean;
  export type WrapType = (typeof WrapValue)[keyof typeof WrapValue];
  
  export const GridColsValue = Object.freeze({
    ...GridColumnsValue,
    None: 'none',
    Subgrid: 'subgrid',
  } as const);
  export type GridColsType = (typeof GridColsValue)[keyof typeof GridColsValue];
  
  export const GridRowsValue = Object.freeze({
    ...GridColumnsValue,
    None: 'none',
    Subgrid: 'subgrid',
  } as const);
  export type GridRowsType = (typeof GridRowsValue)[keyof typeof GridRowsValue];
  
  export const ColSpanValue = Object.freeze({
    ...GridColumnsValue,
    Full: 'full',
  } as const);
  export type ColSpanType = (typeof ColSpanValue)[keyof typeof ColSpanValue];
  export const ColStartValue = Object.freeze({
    ...GridColumnsValue,
    Auto: 'auto',
  } as const);
  export type ColStartType = (typeof ColStartValue)[keyof typeof ColStartValue];
  export const ColEndValue = Object.freeze({
    ...GridColumnsValue,
    Auto: 'auto',
  } as const);
  export type ColEndType = (typeof ColEndValue)[keyof typeof ColEndValue];
  
  export const RowSpanValue = Object.freeze({
    ...GridColumnsValue,
    Full: 'full',
  } as const);
  export type RowSpanType = (typeof RowSpanValue)[keyof typeof RowSpanValue];
  export const RowStartValue = Object.freeze({
    ...GridColumnsValue,
    Auto: 'auto',
  } as const);
  export type RowStartType = (typeof RowStartValue)[keyof typeof RowStartValue];
  export const RowEndValue = Object.freeze({
    ...GridColumnsValue,
    Auto: 'auto',
  } as const);
  export type RowEndType = (typeof RowEndValue)[keyof typeof RowEndValue];
  
  export const GridAutoFlowValue = Object.freeze({
    Col: 'col',
    ColDense: 'col-dense',
    Dense: 'dense',
    Row: 'row',
    RowDense: 'row-dense',
  } as const);
  export type GridAutoFlowType =
    (typeof GridAutoFlowValue)[keyof typeof GridAutoFlowValue];
  
  export const GridAutoValue = Object.freeze({
    Auto: 'auto',
    Fr: 'fr',
    Max: 'max',
    Min: 'min',
  } as const);
  export interface FlexChildrenProps extends StackChildrenProps, WidthProps {
    alignContent?: Responsive<AlignContentType> | undefined;
    basis?: Responsive<BasisType> | undefined;
    grow?: Responsive<Grow> | undefined;
    placeContent?: Responsive<PlaceContentType> | undefined;
    shrink?: Responsive<Shrink> | undefined;
  }
  export interface FlexContainerProps extends StackContainerProps {
    columnSpacing?: Responsive<SpacingType> | undefined;
    direction?: Responsive<DirectionType> | undefined;
    spacing?: Responsive<SpacingType> | undefined;
    wrap?: Responsive<WrapType> | undefined;
  }
  
  export type GridAutoColumnsType =
    (typeof GridAutoValue)[keyof typeof GridAutoValue];
  
  export type GridAutoRowsType =
    (typeof GridAutoValue)[keyof typeof GridAutoValue];
  
  export interface GridChildrenProps extends FlexChildrenProps {
    colEnd?: Responsive<ColEndType> | undefined;
    colSpan?: Responsive<ColSpanType> | undefined;
    colStart?: Responsive<ColStartType> | undefined;
    justifySelf?: Responsive<JustifySelfType> | undefined;
    rowEnd?: Responsive<RowEndType> | undefined;
    rowSpan?: Responsive<RowSpanType> | undefined;
    rowStart?: Responsive<RowStartType> | undefined;
  }
  
  export interface GridContainerProps extends FlexContainerProps {
    colSpan?: Responsive<ColSpanType> | undefined;
    gridAutoColumns?: Responsive<GridAutoColumnsType> | undefined;
    gridAutoFlow?: Responsive<GridAutoFlowType> | undefined;
    gridAutoRows?: Responsive<GridAutoRowsType> | undefined;
    gridCols?: Responsive<GridColsType> | undefined;
    gridRows?: Responsive<GridRowsType> | undefined;
    justifyItems?: Responsive<JustifyItemsType> | undefined;
    placeItems?: Responsive<PlaceItemsType> | undefined;
    rowSpan?: Responsive<RowSpanType> | undefined;
  }
  
  export interface StackChildrenProps
    extends HeightProps, MarginProps, PaddingProps {
    alignSelf?: Responsive<AlignSelfType> | undefined;
    flex?: Responsive<FlexType> | undefined;
    order?: Responsive<OrderType> | undefined;
    placeSelf?: Responsive<PlaceSelfType> | undefined;
  }
  
  export interface StackContainerProps {
    alignItems?: Responsive<AlignItemsType> | undefined;
    justifyContent?: Responsive<JustifyContentType> | undefined;
    rowSpacing?: Responsive<SpacingType> | undefined;
  }
  
  export function generateAlignContent(
    breakpointsValues?: Responsive<AlignContentType>,
  ): Array<string> {
    return toResponsiveClasses<AlignContentType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'content'),
    });
  }
  
  export function generateAlignItems(
    breakpointsValues?: Responsive<AlignItemsType>,
  ): Array<string> {
    return toResponsiveClasses<AlignItemsType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'items'),
    });
  }
  
  export function generateAlignSelf(
    breakpointsValues?: Responsive<AlignSelfType>,
  ): Array<string> {
    return toResponsiveClasses<AlignSelfType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'self'),
    });
  }
  
  export function generateBasis(
    breakpointsValues?: Responsive<BasisType>,
  ): Array<string> {
    return toResponsiveClasses<BasisType>({
      breakpointsValues,
      getClass: (v) => sizeToClass(v, 'basis'),
    });
  }
  
  export function generateColEnd(
    breakpointsValues?: Responsive<ColEndType>,
  ): Array<string> {
    return toResponsiveClasses<ColEndType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'col-end'),
    });
  }
  
  export function generateColSpan(
    breakpointsValues?: Responsive<ColSpanType>,
  ): Array<string> {
    return toResponsiveClasses<ColSpanType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'col-span'),
    });
  }
  
  export function generateColStart(
    breakpointsValues?: Responsive<ColStartType>,
  ): Array<string> {
    return toResponsiveClasses<ColStartType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'col-start'),
    });
  }
  
  export function generateDirection(
    breakpointsValues?: Responsive<DirectionType>,
  ): Array<string> {
    return toResponsiveClasses<DirectionType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'flex'),
    });
  }
  
  export function generateFlex(
    breakpointsValues?: Responsive<FlexType>,
  ): Array<string> {
    return toResponsiveClasses<FlexType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'flex'),
    });
  }
  
  export function generateFlexChildrenClasses(
    props: FlexChildrenProps,
  ): Array<string> {
    return [
      ...generateStackChildrenClasses(props),
      ...generateAlignContent(props.alignContent),
      ...generatePlaceContent(props.placeContent),
      ...generateBasis(props.basis),
      ...generateGrow(props.grow),
      ...generateShrink(props.shrink),
    ];
  }
  
  export function generateFlexContainerClasses(
    props: FlexContainerProps,
  ): Array<string> {
    return [
      ...generateStackContainerClasses(props),
      ...generateWrap(props.wrap),
      ...generateDirection(props.direction),
      ...generateGap(props.spacing),
      ...generateGapX(props.columnSpacing),
    ];
  }
  
  export function generateGap(
    breakpointsValues?: Responsive<SpacingType>,
  ): Array<string> {
    return toResponsiveClasses<SpacingType>({
      breakpointsValues,
      getClass: (v) => sizeToClass(v, 'gap'),
    });
  }
  
  export function generateGapX(
    breakpointsValues?: Responsive<SpacingType>,
  ): Array<string> {
    return toResponsiveClasses<SpacingType>({
      breakpointsValues,
      getClass: (v) => sizeToClass(v, 'gap-x'),
    });
  }
  
  export function generateGapY(
    breakpointsValues?: Responsive<SpacingType>,
  ): Array<string> {
    return toResponsiveClasses<SpacingType>({
      breakpointsValues,
      getClass: (v) => sizeToClass(v, 'gap-y'),
    });
  }
  
  export function generateGridAutoColumns(
    breakpointsValues?: Responsive<GridAutoColumnsType>,
  ): Array<string> {
    return toResponsiveClasses<GridAutoColumnsType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'auto-cols'),
    });
  }
  
  export function generateGridAutoFlow(
    breakpointsValues?: Responsive<GridAutoFlowType>,
  ): Array<string> {
    return toResponsiveClasses<GridAutoFlowType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'grid-flow'),
    });
  }
  export function generateGridAutoRows(
    breakpointsValues?: Responsive<GridAutoRowsType>,
  ): Array<string> {
    return toResponsiveClasses<GridAutoRowsType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'auto-rows'),
    });
  }
  export function generateGridChildrenClasses(
    props: GridChildrenProps,
  ): Array<string> {
    return [
      ...generateFlexChildrenClasses(props),
      ...generateJustifySelf(props.justifySelf),
      ...generateColSpan(props.colSpan),
      ...generateColStart(props.colStart),
      ...generateColEnd(props.colEnd),
      ...generateRowSpan(props.rowSpan),
      ...generateRowStart(props.rowStart),
      ...generateRowEnd(props.rowEnd),
    ];
  }
  export function generateGridCols(
    breakpointsValues?: Responsive<GridColsType>,
  ): Array<string> {
    return toResponsiveClasses<GridColsType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'grid-cols'),
    });
  }
  
  export function generateGridContainerClasses(
    props: GridContainerProps,
  ): Array<string> {
    return [
      ...generateFlexContainerClasses(props),
      ...generateGridCols(props.gridCols),
      ...generateGridRows(props.gridRows),
      ...generateGridAutoFlow(props.gridAutoFlow),
      ...generateGridAutoColumns(props.gridAutoColumns),
      ...generateGridAutoRows(props.gridAutoRows),
      ...generateColSpan(props.colSpan),
      ...generateRowSpan(props.rowSpan),
      ...generateJustifyItems(props.justifyItems),
      ...generatePlaceItems(props.placeItems),
    ];
  }
  
  export function generateGridRows(
    breakpointsValues?: Responsive<GridRowsType>,
  ): Array<string> {
    return toResponsiveClasses<GridRowsType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'grid-rows'),
    });
  }
  
  export function generateGrow(breakpointsValues?: Responsive<Grow>): Array<string> {
    return toResponsiveClasses<Grow>({
      breakpointsValues,
      getClass: (v) => resizeToClass(v, 'grow'),
    });
  }
  
  export function generateJustifyContent(
    breakpointsValues?: Responsive<JustifyContentType>,
  ): Array<string> {
    return toResponsiveClasses<JustifyContentType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'justify'),
    });
  }
  
  export function generateJustifyItems(
    breakpointsValues?: Responsive<JustifyItemsType>,
  ): Array<string> {
    return toResponsiveClasses<JustifyItemsType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'justify-items'),
    });
  }
  
  export function generateJustifySelf(
    breakpointsValues?: Responsive<JustifySelfType>,
  ): Array<string> {
    return toResponsiveClasses<JustifySelfType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'justify-self'),
    });
  }
  
  export function generateOrder(
    breakpointsValues?: Responsive<OrderType>,
  ): Array<string> {
    return toResponsiveClasses<OrderType>({
      breakpointsValues,
      getClass: (v) => orderToClass(v),
    });
  }
  
  export function generatePlaceContent(
    breakpointsValues?: Responsive<PlaceContentType>,
  ): Array<string> {
    return toResponsiveClasses<PlaceContentType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'place-content'),
    });
  }
  
  export function generatePlaceItems(
    breakpointsValues?: Responsive<PlaceItemsType>,
  ): Array<string> {
    return toResponsiveClasses<PlaceItemsType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'place-items'),
    });
  }
  
  export function generatePlaceSelf(
    breakpointsValues?: Responsive<PlaceSelfType>,
  ): Array<string> {
    return toResponsiveClasses<PlaceSelfType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'place-self'),
    });
  }
  
  export function generateRowEnd(
    breakpointsValues?: Responsive<RowEndType>,
  ): Array<string> {
    return toResponsiveClasses<RowEndType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'row-end'),
    });
  }
  
  export function generateRowSpan(
    breakpointsValues?: Responsive<RowSpanType>,
  ): Array<string> {
    return toResponsiveClasses<RowSpanType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'row-span'),
    });
  }
  
  export function generateRowStart(
    breakpointsValues?: Responsive<RowStartType>,
  ): Array<string> {
    return toResponsiveClasses<RowStartType>({
      breakpointsValues,
      getClass: (v) => gridToClass(v, 'row-start'),
    });
  }
  
  export function generateShrink(
    breakpointsValues?: Responsive<Shrink>,
  ): Array<string> {
    return toResponsiveClasses<Shrink>({
      breakpointsValues,
      getClass: (v) => resizeToClass(v, 'shrink'),
    });
  }
  
  export function generateStackChildrenClasses(
    props: StackChildrenProps,
  ): Array<string> {
    return [
      ...generateFlex(props.flex),
      ...generateOrder(props.order),
      ...generateAlignSelf(props.alignSelf),
      ...generatePlaceSelf(props.placeSelf),
    ];
  }
  
  export function generateStackContainerClasses(
    props: StackContainerProps,
  ): Array<string> {
    return [
      ...generateJustifyContent(props.justifyContent),
      ...generateAlignItems(props.alignItems),
      ...generateGapY(props.rowSpacing),
    ];
  }
  
  export function generateWrap(
    breakpointsValues?: Responsive<WrapType>,
  ): Array<string> {
    return toResponsiveClasses<WrapType>({
      breakpointsValues,
      getClass: (v) => flexToClass(v, 'flex'),
    });
  }
  
  export function orderToClass(value: OrderType): string {
    return `order-${value}`;
  }
  
  function flexToClass(
    value:
      | AlignContentType
      | AlignItemsType
      | AlignSelfType
      | DirectionType
      | FlexType
      | JustifyContentType
      | JustifyItemsType
      | JustifySelfType
      | PlaceContentType
      | PlaceItemsType
      | PlaceSelfType
      | WrapType,
    prefix:
      | 'content'
      | 'flex'
      | 'items'
      | 'justify'
      | 'justify-items'
      | 'justify-self'
      | 'place-content'
      | 'place-items'
      | 'place-self'
      | 'self',
  ): string {
    return `${prefix}-${value}`;
  }
  
  function gridToClass(
    value:
      | ColEndType
      | ColSpanType
      | ColStartType
      | GridAutoColumnsType
      | GridAutoFlowType
      | GridAutoRowsType
      | GridColsType
      | GridRowsType
      | RowEndType
      | RowSpanType
      | RowStartType,
    prefix:
      | 'auto-cols'
      | 'auto-rows'
      | 'col-end'
      | 'col-span'
      | 'col-start'
      | 'grid-cols'
      | 'grid-flow'
      | 'grid-rows'
      | 'row-end'
      | 'row-span'
      | 'row-start',
  ): string {
    return `${prefix}-${value}`;
  }
  
  function resizeToClass(value: boolean, prefix: 'grow' | 'shrink') {
    return value ? prefix : `${prefix}-0`;
  }
  