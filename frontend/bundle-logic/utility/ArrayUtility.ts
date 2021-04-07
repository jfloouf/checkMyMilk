export function asArray<T>(value: T | T[]): T[] {
  return ([] as T[]).concat(value);
}

export function intersection(a1: any[], a2: any[]) {
  return a1.filter((value) => a2.includes(value));
}
