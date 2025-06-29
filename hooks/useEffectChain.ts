import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type MessageState = {
  // All in One State Changer
  freeze: boolean;
  setFreeze: (bool: boolean) => void;
};

// Create the hook, with set functions
export const useEffectChain = create<MessageState>()(
  immer((set) => ({
    freeze: false,
    setFreeze: (bool) => set((s) => ({ freeze: bool }))
  }))
);
