export type Responsive<T> =
  (Partial<Record<Breakpoint, T | undefined>> & { base?: T | undefined }) | T;

type Breakpoint = '2xl' | 'lg' | 'md' | 'sm' | 'xl';

/**
 * Tailwind variant prefix applied to every utility emitted by the system
 * package. Spectra UI ships with a `prefix(spectra)` Tailwind configuration so
 * every utility class must start with `spectra:` to be picked up by Tailwind's
 * scanner and to compile against the prefixed theme variables.
 */
export const PREFIX = 'spectra:';

/**
 * Prepend `spectra:` (and an optional variant like `sm:`) to every whitespace
 * separated utility in a raw class string. The Tailwind prefix always sits
 * at the very front of the token, before any breakpoint/state variants.
 *
 * @example
 *   applyPrefix('flex')        // -> 'spectra:flex'
 *   applyPrefix('flex', 'sm:') // -> 'spectra:sm:flex'
 *   applyPrefix('divide-x divide-slate-200', 'sm:')
 *     // -> 'spectra:sm:divide-x spectra:sm:divide-slate-200'
 */
const WHITESPACE = /\s+/;

export function applyPrefix(raw: string, variant = ''): string {
  return raw
    .split(WHITESPACE)
    .filter(Boolean)
    .map((cls) => `${PREFIX}${variant}${cls}`)
    .join(' ');
}

export function toResponsiveClasses<T>({
  breakpointsValues,
  className,
  getClass,
}: {
  breakpointsValues?: Responsive<T> | undefined;
  className?: string | undefined;
  getClass: (breakpoint: T, className?: string) => string;
}): Array<string> {
  if (breakpointsValues === undefined || breakpointsValues === null) return [];
  if (typeof breakpointsValues !== 'object') {
    return [applyPrefix(getClass(breakpointsValues, className))];
  }

  const responsiveBreakpoints = breakpointsValues as Partial<
    Record<Breakpoint, T>
  > & {
    base?: T;
  };

  const classes: Array<string> = [];
  if (responsiveBreakpoints.base != null)
    classes.push(applyPrefix(getClass(responsiveBreakpoints.base, className)));
  if (responsiveBreakpoints.sm != null)
    classes.push(
      applyPrefix(getClass(responsiveBreakpoints.sm, className), 'sm:'),
    );
  if (responsiveBreakpoints.md != null)
    classes.push(
      applyPrefix(getClass(responsiveBreakpoints.md, className), 'md:'),
    );
  if (responsiveBreakpoints.lg != null)
    classes.push(
      applyPrefix(getClass(responsiveBreakpoints.lg, className), 'lg:'),
    );
  if (responsiveBreakpoints.xl != null)
    classes.push(
      applyPrefix(getClass(responsiveBreakpoints.xl, className), 'xl:'),
    );
  return classes;
}
