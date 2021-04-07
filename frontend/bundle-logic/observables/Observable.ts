import { isNull } from "../testing/NullCheck";
import UUID from "../utility/UUID";
import { UpdateType } from "./UpdateType";
import { PrivateObservable } from "./PrivateObservable";

export interface IObsSubscriber<T> {
  callback: (newValue: T, oldValue?: T, updateType?: UpdateType) => void;
  updateType?: UpdateType;
}

export abstract class Observable<T> {
  private subscribers: {
    [id: string]: IObsSubscriber<T>;
  } = {};

  readonly privateObs: PrivateObservable<T>;

  constructor(protected _value: T, private logMessage?: string) {
    this.privateObs = new PrivateObservable(this);
  }

  protected abstract shouldValueUpdate(newValue: T): boolean;

  /*
        Subscribe to updates.

        If an updateType is provided, the subscriber will only be notified
        if the updateType of the change matches the updateType provided.

        returns an unsubscribe method
    */
  subscribe(subscriber: IObsSubscriber<T>): () => void {
    const id = UUID.generate().value;
    this.subscribers[id] = subscriber;

    return () => {
      delete this.subscribers[id];
    };
  }

  /*
        Same as subscribe(), but also initially calls the callback-function
        once, as a way to make it easier to initiate variables. 
    */
  subscribeWithInitial(subscriber: IObsSubscriber<T>) {
    subscriber.callback(this.value);
    return this.subscribe(subscriber);
  }

  set(newValue: T) {
    this.updateWithType(newValue, UpdateType.SET);
  }

  sync(newValue: T) {
    this.updateWithType(newValue, UpdateType.SYNC);
  }

  // wtf?
  updateWithType(newValue: T, type: UpdateType) {
    if (this.shouldValueUpdate(newValue)) {
      const oldValue = this._value;
      this._value = newValue;
      this.notify(newValue, oldValue, type);
    }
  }

  /*   bind<T2>(
    args:
      | Observable<T>
      | {
          obs: Observable<T2>;
          convert(value: T2): T;
        }
  ) {
    if ("subscribeWithInitial" in args) {
      return args.subscribeWithInitial((value: T) => {
        this.set(value);
      });
    } else {
      return args.obs.subscribeWithInitial((value: T2) => {
        this.set(args.convert(value));
      });
    }
  } */

  /*
        Notifies each subscriber that either provided no updateType when subscribing,
        or provided the a matching updateType of the change.
    */
  protected notify(newValue: T, oldValue: T | undefined, type: UpdateType) {
    if (this.logMessage) {
      console.log(this.logMessage + `, type: ${type}:`);
    }
    Object.values(this.subscribers).forEach(({ callback, updateType }) => {
      if (isNull(updateType) || updateType === type) {
        callback(newValue, oldValue, type);
      }
    });
  }

  get value() {
    return this._value;
  }
}
