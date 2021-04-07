import React, { useEffect, useRef, useState } from "react";

export function useOnEnterClick(args: {
  ref: React.MutableRefObject<HTMLElement>;
  callback?();
}) {
  useEffect(() => {
    const { ref, callback } = args;
    if (ref.current && callback) {
      const { current } = ref;
      current.addEventListener("keypress", onEnterClick);
    }

    return () => {
      ref.current?.removeEventListener("keypress", onEnterClick);
    };
  });

  const onEnterClick = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      // Not sure what the default is in this case
      event.preventDefault();
      args.callback && args.callback();
    }
  };
}

/* export function useMobileResize(elementId: string = "root") {
  const initialResizeRef = useRef<boolean>(false);

  function resize() {
    console.log("resize");
    const root = document?.getElementById(elementId);
    // Height without the adress bar when on mobile
    const innerHeight = window.innerHeight;
    if (root && root.style) {
      console.log("yes");
      root.style.height = innerHeight + "px";
    }
  }

  useEffect(() => {
    if (!initialResizeRef.current) {
      resize();
      initialResizeRef.current = true;
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  });
}
 */

export function useUpdate(): () => void {
  const [bool, setBool] = useState<boolean>(false);

  function update() {
    setBool(!bool);
  }

  return update;
}

export function useForcedUpdate<T>(initial?: T): [T, (newValue: T) => void] {
  const valueRef = useRef<T>(initial);
  const [localState, setLocalState] = useState<T>(initial);
  const update = useUpdate();

  function updateValue(newValue: T) {
    valueRef.current = newValue;
    update();
  }

  return [valueRef.current, updateValue];
}
