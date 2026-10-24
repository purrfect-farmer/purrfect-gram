/** Returns the integers from `from` to `to`, both inclusive. */
export function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}
