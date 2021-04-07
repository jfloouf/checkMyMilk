import { useEffect, useState } from "react";
import { PrivateObservable } from "../../bundle-logic/observables/PrivateObservable";
import { Observable } from "../../bundle-logic/observables/Observable";

export function useBind<T>(obs: PrivateObservable<T> | Observable<T>): T {
  const [state, setState] = useState(obs.value);

  useEffect(() => {
    const unsubscribe = obs.subscribe({
      callback: (newValue: T) => {
        setState(newValue);
      },
    });

    return unsubscribe;
  });

  return state;
}
