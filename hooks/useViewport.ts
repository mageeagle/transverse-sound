import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type ViewportState = {
  // All in One State Changer
  width: number;
  height: number;
  setWidth: (num: number) => void;
  setHeight: (num: number) => void;
};

// Create the hook, with set functions
export const useViewport = create<ViewportState>()(
  immer((set) => ({
    width: 0,
    height: 0,
    setWidth: (num) => set(() => ({ width: num })),
    setHeight: (num) => set(() => ({ height: num })),
  }))
);