type SingularPrimitive = string | number | boolean;
export type Primitive =
  | SingularPrimitive
  | SingularPrimitive[]
  | Primitive[]
  | { [key: string]: Primitive }
  //hmm
  | undefined;
