import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type LoadingState = {
  // All in One State Changer
  setLoaded: (key: number) => void;
  setDecoderOn: (bool: boolean) => void;
  setDeviceLoaded: (bool: Boolean) => void;
  clearLoaded: () => void;
  clearBufferLoaded: () => void;
  setBufferLoaded: () => void;
  setDecoderLoaded: () => void;
  toneStart: () => void;
  bufferLoaded: boolean;
  decoderLoaded: boolean;
  tone: boolean;
  decoderOn: boolean;
  deviceLoaded: boolean;
};

const user: { [i: number]: boolean } = {};
// 2nd Order, if 3rd Order, increase this.
for (let i = 1; i <= 9; i++) {
  user[i] = false;
}

// Create the hook, with set functions
export const useLoading = create<LoadingState & typeof user>()(
  immer((set) => ({
    ...user,
    bufferLoaded: false,
    decoderLoaded: false,
    deviceLoaded: false,
    tone: false,
    decoderOn: false,
    setLoaded: (key: number) => set(() => ({ [key]: true })),
    setDecoderOn: (bool: Boolean) => set(() => ({ decoderOn: bool })),
    setBufferLoaded: () => set(() => ({ bufferLoaded: true })),
    setDeviceLoaded: (bool: Boolean) => set(() => ({ deviceLoaded: bool })),
    toneStart: () => set(() => ({ tone: true })),
    setDecoderLoaded: () => set(() => ({ decoderLoaded: true })),
    clearBufferLoaded: () => set(() => ({ bufferLoaded: false })),
    clearLoaded: () => set(() => ({ ...user })),
  }))
);
