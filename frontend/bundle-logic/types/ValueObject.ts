import { Primitive } from "./MyTypes";
export interface ValueObject<T extends Primitive> {
  value: T;
}
