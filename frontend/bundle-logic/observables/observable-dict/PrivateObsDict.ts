import { ObservableDict, IObsDictSubscriber } from "./ObservableDict";
export class PrivateObsDict<T> {
  constructor(private obsDict: ObservableDict<T>) {}

  subscribe(subscriber: IObsDictSubscriber): () => void {
    return this.obsDict.subscribe(subscriber);
  }

  get values(): T[] {
    return this.obsDict.values;
  }

  get keys(): string[] {
    return this.obsDict.keys;
  }

  get dict(): { [key: string]: T } {
    return this.obsDict.dict;
  }
}
