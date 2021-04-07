import { PrivateObsDict } from "./PrivateObsDict";
import { asArray } from "../../utility/ArrayUtility";
import UUID from "../../utility/UUID";
import { intersection } from "../../utility/ArrayUtility";
import { ObsDictEvent, ObsDictEventType } from "./ObsDictEvent";

export interface IObsDictArgs<T> {
  keyExtractor(from: T): string;
  initialValues?: T | T[];
}

export interface IObsDictSubscriber {
  callback: (event: ObsDictEvent) => void;
  eventTypes?: ObsDictEventType | ObsDictEventType[];
  keys?: string | string[];
}

export class ObservableDict<T> {
  private _dict: { [key: string]: T } = {};
  private keyExtractor: (from: T) => string;
  readonly privateObs: PrivateObsDict<T>;

  private subscribers: {
    [id: string]: IObsDictSubscriber;
  } = {};

  constructor(args: IObsDictArgs<T>) {
    const { keyExtractor, initialValues } = args;
    this.keyExtractor = keyExtractor;

    if (initialValues) {
      this.add(initialValues);
    }

    this.privateObs = new PrivateObsDict(this);
  }

  public add(values: T | T[]) {
    const keys: string[] = [];
    asArray(values).forEach((value) => {
      const key = this.keyExtractor(value);
      this._dict[key] = value;
      keys.push(key);
    });
    this.fireEvent({
      type: ObsDictEventType.add,
      keys,
    });
  }

  public delete(values: T | string | T[] | string[]) {
    const keys: string[] = [];
    asArray(values).forEach((value) => {
      const key = typeof value === "string" ? value : this.keyExtractor(value);
      delete this._dict[key];
      keys.push(key);
    });
    this.fireEvent({
      type: ObsDictEventType.delete,
      keys,
    });
  }

  public reset() {
    const keys = this.keys;
    this._dict = {};
    this.fireEvent({
      type: ObsDictEventType.reset,
      keys,
    });
  }

  public inDict(value: T | string) {
    const key = typeof value === "string" ? value : this.keyExtractor(value);
    return key in this._dict;
  }

  subscribe(subscriber: IObsDictSubscriber): () => void {
    const id = UUID.generate().value;
    this.subscribers[id] = subscriber;

    return () => {
      delete this.subscribers[id];
    };
  }

  private fireEvent({ type, keys }: ObsDictEvent) {
    Object.values(this.subscribers).forEach(
      ({ callback, eventTypes, keys: subscriberKeys }) => {
        const matchingEvent = !eventTypes || type in asArray(eventTypes);
        const matchingKeys =
          !subscriberKeys || !!intersection(keys, asArray(subscriberKeys));
        const shouldNotify = matchingEvent && matchingKeys;

        if (shouldNotify) {
          callback({ type, keys });
        }
      }
    );
  }

  get values(): T[] {
    return Object.values(this._dict);
  }

  get keys(): string[] {
    return Object.keys(this._dict);
  }

  get dict(): { [key: string]: T } {
    return { ...this._dict };
  }
}
