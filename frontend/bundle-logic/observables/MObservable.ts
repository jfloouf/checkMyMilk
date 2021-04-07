import { Observable } from "./Observable";
import { Primitive } from '../Types and Simple Interfaces/MyTypes';
import { VO } from '../Types and Simple Interfaces/VO';
import { Comparable } from "../Types and Simple Interfaces/Comparable";

type Allowed = Primitive | VO | Comparable;

function isComparable(obj: Allowed): obj is Comparable {
    return !!(obj && "isTheSame" in (obj as any));
}

export class MObservable<T extends Allowed> extends Observable<T> {

    shouldValueUpdate(newValue: T) {
        if (isComparable(newValue) && isComparable(this._value)) {
            return !(this._value.isTheSame(newValue));
        }

        if ("value" in newValue && "value" in this._value) {
            return this._value.value !== newValue.value;
        }
            
        return this._value !== newValue;
  }
}
