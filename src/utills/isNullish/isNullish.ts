/**
 * Checks whether a value, or all values within an object or array, are nullish.
 * Note: it only checks the first level of array/object values.
 *
 * For primitives, it behaves like `isNullish`.
 * For arrays, returns `true` only if **all** items are nullish.
 * For objects, returns `true` only if **all** values are nullish.
 *
 * @param value - The value, array, or object to check.
 * @returns `true` if the value is nullish or all nested values are nullish, otherwise `false`.
 */
export function isNullish<T>(value: T | null | undefined): value is null | undefined {
  if (value === null || value === undefined) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isNullish);
  }

  if (typeof value === 'object') {
    return Object.values(value!).every(isNullish);
  }

  return false;
}
