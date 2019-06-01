const isArrayAndNotNil = (value: any): boolean =>
  value && value instanceof Array;

const defaultTo = <T>(isValidFn: (value: any) => boolean) => (
  defaultValue: any,
  value: T,
): T => (isValidFn(value) ? value : defaultValue);

const defaultToWhenInvalidArray: <T>(
  defaultValue: any,
  value: T,
) => T = defaultTo(isArrayAndNotNil);

export { isArrayAndNotNil, defaultTo, defaultToWhenInvalidArray };
