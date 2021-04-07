export function notNull(obj: any): boolean {
  const type = typeof obj;
  if (type === "boolean") return true;
  if (type === "number") return true;
  if (type === "string") return true;
  return !!obj;
}

export function isNull(obj: any): boolean {
  return !notNull(obj);
}
