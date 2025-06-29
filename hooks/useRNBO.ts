import { Device } from "@rnbo/js";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import emptyPatch from "@/rnbo/empty.json"
// Set type for store / Only for typescript
type MessageState = {
  // All in One State Changer
  device: Device | null;
  setDevice: (str: Device) => void;
  emptyPatch: typeof emptyPatch | null;
};

// Create the hook, with set functions
export const useRNBO = create<MessageState>()(
  immer((set) => ({
    device: null,
    setDevice: (str) => set(() => ({ device: str })),
    emptyPatch: emptyPatch,
  }))
);
