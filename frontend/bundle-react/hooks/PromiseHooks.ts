import { useEffect, useState } from "react";


type PromiseState = "pending" | "fulfilled" | "error";

export function usePromise(promise: Promise<any>): PromiseState {

  const [state, setState] = useState<PromiseState>("pending");

  useEffect(() => {
    if (state === "pending") {
        promise.then(() => setState("fulfilled")).catch(err => {
            console.log("usePromise error: ", err);
            setState("error");
        })
    }
  }, [state]);

  return state;
}
