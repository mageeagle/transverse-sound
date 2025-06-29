import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import * as Tone from "tone";

// Set type for store / Only for typescript
type SensorsState = {
  // All in One State Changer
  setArea: (ind: number) => void;
  setSubSection: (ind: number) => void;
  setIdArr: (ind: number[]) => void;
  setClosest: (ind: number) => void;
  posInited: () => void;
  setAmbisonicsInput: (input: Tone.Merge | null) => void;
};

// Initial Values
// Change Map parameters here, including listening location and radius
const user = {
  spotIdArr: [] as number[],
  closestId: 0,
  areaId: 0,
  subSection: 0,
  posInit: false,
  ambisonicsInput: null as Tone.Merge | null,
};

// Create the hook, with set functions
export const useSpots = create<SensorsState & typeof user>()(
  immer((set) => ({
    ...user,
    setArea: (ind) => set(() => ({ areaId: ind })),
    setSubSection: (ind) => set(() => ({ subSection: ind })),
    setIdArr: (arr) => set(() => ({ spotIdArr: arr })),
    setClosest: (ind) => set(() => ({ closestId: ind })),
    posInited: () => set(() => ({ posInit: true })),
    setAmbisonicsInput: (input) => set(() => ({ ambisonicsInput: input })),
  }))
);
