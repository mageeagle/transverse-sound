import { RefObject } from "react";
import { UseBoundStore } from "zustand";

// Subscribe here updates values to a useRef which prevents rerendering every time a value updates
export const subKey = (
    hook: UseBoundStore<any>,
    key1: RefObject<any>,
    key2: string | number
  ) => {
    hook.subscribe(
      (state: { [x: string | number]: any }) => (key1.current = state[key2])
    );
  };
  
  export const subNestedKey = (
    hook: UseBoundStore<any>,
    key1: RefObject<any>,
    key2: string | number,
    key3: string | number
  ) => {
    hook.subscribe(
      (state: { [x: string | number]: { [x: string | number]: any } }) =>
        (key1.current = state[key2][key3])
    );
  };
  