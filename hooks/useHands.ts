import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type MessageState = {
  // All in One State Changer
  centroid: number[];
  setCentroid: (bool: number[]) => void;
  category: string;
  setCategory: (bool: string) => void;
};

// Create the hook, with set functions
export const useHands = create<MessageState>()(
  immer((set) => ({
    centroid: [0, 0],
    category: "",
    setCentroid: (bool) => set(() => ({ centroid: bool })),
    setCategory: (bool) => set(() => ({ category: bool }))
  }))
);
