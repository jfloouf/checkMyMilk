import { Observable, IObsSubscriber } from "./Observable";
import { UpdateType } from "./UpdateType";
export class PrivateObservable<T> {
  constructor(private obs: Observable<T>) {}

  subscribe(subscriber: IObsSubscriber<T>): () => void {
    return this.obs.subscribe(subscriber);
  }

  subscribeWithInitial(subscriber: IObsSubscriber<T>): () => void {
    return this.obs.subscribeWithInitial(subscriber);
  }

  get value() {
    return this.obs.value;
  }
}
