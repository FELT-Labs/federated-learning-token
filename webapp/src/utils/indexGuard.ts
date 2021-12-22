export function isKeyof<T extends Record<string, unknown>>(
  possibleKey: keyof any,
  obj: T,
): possibleKey is keyof T {
  return possibleKey in obj;
}
