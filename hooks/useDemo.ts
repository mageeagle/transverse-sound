import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type ViewportState = {
  // All in One State Changer
  xy: [number, number];
  y: number;
  setXY: (arr: [number, number]) => void;
};

// Create the hook, with set functions
export const useDemo = create<ViewportState>()(
  immer((set) => ({
    xy: [0, 0],
    y: 0,
    setXY: (arr) => set(() => ({ xy: arr })),
  }))
);