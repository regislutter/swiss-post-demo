import type {
    FlexContainerProps,
  } from './flex-grid.ts';
  import type { GenericProps } from './generic.ts';
  import type { ButtonHTMLAttributes, Ref } from 'react';
  
  import {
    generateGenericClasses,
  } from './generic.ts';
  import { generateFlexContainerClasses } from './flex-grid.ts';
  import { cva } from 'class-variance-authority';
  import { twMerge } from 'tailwind-merge';
  
  export const buttonVariantsDefinitions = {
    inline: {
      true: 'spectra:inline-flex',
    },
    intent: {
      danger: [
        'spectra:bg-danger',
        'spectra:text-danger-foreground',
        'spectra:focus-visible:ring-ring-danger',
        'spectra:active:ring-ring-danger',
        'spectra:hover:bg-danger-accent',
        'spectra:focus-visible:bg-danger-accent',
        'spectra:active:bg-danger-dark',
        'spectra:disabled:bg-danger-muted',
      ],
      primary: [
        'spectra:bg-primary',
        'spectra:text-primary-foreground',
        'spectra:hover:bg-primary-accent',
        'spectra:focus-visible:bg-primary-accent',
        'spectra:active:bg-primary-dark',
        'spectra:disabled:bg-primary-muted',
      ],
      secondary: [
        'spectra:outline',
        'spectra:outline-1',
        'spectra:outline-secondary',
        'spectra:bg-background',
        'spectra:text-secondary-foreground',
        'spectra:focus:visible:ring-ring-secondary',
        'spectra:active:ring-ring-secondary',
        'spectra:shadow-sm',
        'spectra:hover:bg-slate-50',
        'spectra:focus-visible:bg-secondary-muted',
        'spectra:active:bg-secondary-muted',
        'spectra:disabled:bg-slate-50',
        'spectra:disabled:text-secondary-muted-foreground',
        'spectra:disabled:shadow-none',
      ],
    },
    rounded: {
      true: 'spectra:rounded-full',
    },
    size: {
      'icon': 'spectra:rounded-xl spectra:p-2.5 spectra:[&>svg]:size-4',
      'icon-sm': 'spectra:rounded-lg spectra:p-1.5 spectra:[&>svg]:size-3',
      'lg': 'spectra:gap-2 spectra:rounded-2xl spectra:px-4 spectra:py-2 spectra:text-lg spectra:leading-7 spectra:[&>svg]:size-6',
      'md': 'spectra:gap-2 spectra:rounded-xl spectra:px-3 spectra:py-2 spectra:text-sm spectra:leading-5 spectra:[&>svg]:size-4',
      'sm': 'spectra:gap-2 spectra:rounded-lg spectra:px-2 spectra:py-0.5 spectra:text-sm spectra:leading-5 spectra:[&>svg]:size-3',
    },
    variant: {
      default: '',
      ghost: 'spectra:bg-transparent',
      link: 'spectra:bg-transparent! spectra:outline-0! spectra:p-0! spectra:shadow-none! spectra:font-normal spectra:underline-offset-4 spectra:hover:underline spectra:hover:ring-0! spectra:focus-visible:ring-0! spectra:active:ring-0! spectra:hover:bg-transparent! spectra:focus-visible:bg-transparent! spectra:active:bg-transparent!',
    },
    width: {
      '1/2': 'spectra:w-1/2',
      'auto': 'spectra:w-auto',
      'full': 'spectra:w-full',
    },
  };
  
  const buttonVariants = cva(
    'spectra-ring-focus spectra:box-border spectra:flex spectra:cursor-pointer spectra:items-center spectra:justify-center spectra:font-medium spectra:whitespace-nowrap spectra:transition-all spectra:disabled:pointer-events-none spectra:disabled:cursor-not-allowed spectra:[&_svg]:pointer-events-none spectra:[&_svg]:shrink-0',
    {
      compoundVariants: [
        // Primary Ghost
        {
          className:
            'spectra:text-primary spectra:hover:bg-brand-50 spectra:focus-visible:bg-brand-50 spectra:active:bg-primary-muted spectra:disabled:text-brand-350 spectra:bg-transparent spectra:disabled:bg-transparent',
          intent: 'primary',
          variant: 'ghost',
        },
        // Primary Link
        {
          className:
            'spectra:text-primary spectra:hover:text-primary-dark spectra:focus-visible:text-primary-dark spectra:active:text-brand-800',
          intent: 'primary',
          variant: 'link',
        },
        // Secondary Ghost
        {
          className:
            'spectra:text-secondary-foreground spectra:hover:bg-secondary-muted spectra:focus-visible:bg-secondary-accent spectra:active:bg-secondary-accent spectra:disabled:text-secondary-muted-foreground spectra:bg-transparent spectra:shadow-none spectra:outline-none spectra:disabled:bg-transparent',
          intent: 'secondary',
          variant: 'ghost',
        },
        // Secondary Link
        {
          className:
            'spectra:text-secondary-foreground spectra:hover:text-foreground spectra:focus-visible:text-foreground spectra:active:text-foreground spectra:outline-none!',
          intent: 'secondary',
          variant: 'link',
        },
        // Danger Ghost
        {
          className:
            'spectra:text-danger-accent spectra:outline-danger spectra:focus-visible:outline-danger spectra:active:bg-danger-muted spectra:focus-visible:bg-danger-muted spectra:bg-transparent spectra:shadow-sm spectra:outline spectra:outline-1 spectra:hover:bg-red-50 spectra:disabled:bg-transparent spectra:disabled:text-red-200 spectra:disabled:shadow-none',
          intent: 'danger',
          variant: 'ghost',
        },
        // Danger Link
        {
          className:
            'spectra:text-danger-accent spectra:hover:text-danger-dark spectra:focus-visible:text-danger-dark spectra:active:text-danger-dark',
          intent: 'danger',
          variant: 'link',
        },
      ],
      defaultVariants: {
        intent: 'primary',
        size: 'md',
        variant: 'default',
      },
      variants: buttonVariantsDefinitions,
    },
  );
  
  export interface ButtonProps
    extends
    ButtonVariantsProps,
    FlexContainerProps,
    GenericProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    asChild?: boolean | undefined;
    ref?: Ref<HTMLButtonElement> | undefined;
  }
  
  export interface ButtonVariantsProps {
    /**
     * If true, displays as inline-flex
     */
    inline?: boolean | null | undefined;
    /**
     * Intent (color scheme) of the Button
     * @default "primary"
     */
    intent?: 'danger' | 'primary' | 'secondary' | null | undefined;
    /**
     * If true, applies fully rounded corners
     */
    rounded?: boolean | null | undefined;
    /**
     * Size of the Button
     * @default "md"
     */
    size?: 'icon' | 'icon-sm' | 'lg' | 'md' | 'sm' | null | undefined;
    /**
     * Visual variant of the Button
     * @default "default"
     */
    variant?: 'default' | 'ghost' | 'link' | null | undefined;
    /**
     * Width of the Button
     */
    width?: '1/2' | 'auto' | 'full' | null | undefined;
  }
  
  /**
   * Button - Clickable element that triggers an action
   *
   * @param intent - Intent (color) of the Button
   * @param variant - Variant of the Button
   * @param size - Size of the Button
   * @param width - Width of the Button
   * @param rounded - Rounded of the Button
   * @param inline - Inline of the Button
   * @param asChild - If the Button is as a child
   * @param props - Generic props
   * @returns Button component
   */
  function Button({
    alignItems,
    asChild = false,
    bottom,
    columnSpacing,
    direction,
    // GenericProps
    display,
    inline,
    inset,
    insetX,
    insetY,
    intent,
    isolate,
    // FlexContainerProps
    justifyContent,
    left,
    lineClamp,
    order,
    position,
    ref,
    right,
    rounded,
    rowSpacing,
    size,
    spacing,
    textAlign,
    textOverflow,
    textTransform,
    textWrap,
    top,
    type = 'button',
    variant,
    verticalAlign,
    visibility,
    whitespace,
    width,
    wordBreak,
    wrap,
    ...props
  }: ButtonProps) {
    // const Comp = asChild ? Slot : 'button';
    const twClasses = [
      ...generateGenericClasses({
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
      }),
      ...generateFlexContainerClasses({
        alignItems,
        columnSpacing,
        direction,
        justifyContent,
        rowSpacing,
        spacing,
        wrap,
      }),
    ];
    return (
      <button
        className={twMerge(
          'spectra-button',
          buttonVariants({ inline, intent, rounded, size, variant, width }),
          twClasses,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
  
  export { Button, buttonVariants };
  