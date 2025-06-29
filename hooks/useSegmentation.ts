import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type MessageState = {
  // All in One State Changer
  capture: number;
  setCapture: (bool: number) => void;
  percentage: number;
  setPercentage: (bool: number) => void;
};

// Create the hook, with set functions
export const useSegmentation = create<MessageState>()(
  immer((set) => ({
    capture: 0,
    percentage: 0,
    setCapture: (bool) => set(() => ({ capture: bool })),
    setPercentage: (bool) => set(() => ({ percentage: bool }))
  }))
);
