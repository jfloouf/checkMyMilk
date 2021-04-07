import { Observable } from "./Observable";
import { Primitive } from '../Types and Simple Interfaces/MyTypes';

/*
  Used when the type T is primitive, so that we can compare it using the ===
  operator to tell if the new value is different from the one before.

  We only notify the subscribers if the value has truly changed.
*/
export class PrimitiveObservable<T extends Primitive> extends Observable<T> {
  shouldValueUpdate(newValue: T) {
    return this._value !== newValue;
  }
}
