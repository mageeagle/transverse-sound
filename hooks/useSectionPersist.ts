import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

// Set type for store / Only for typescript
type SectionPersistState = {
  // All in One State Changer

  prelude: number;
  ice: number;
  mold: number;
  rift: number;
  crossing: number;
  blur: number;
  pier: number;

  setPrelude: (num: number) => void;
  setIce: (num: number) => void;
  setMold: (num: number) => void;
  setRift: (num: number) => void;
  setCrossing: (num: number) => void;
  setBlur: (num: number) => void;
  setPier: (num: number) => void;
  complete: () => void;
  reset: () => void;
};

// Create the hook, with set functions
export const useSectionPersist = create<SectionPersistState>()(
  persist(
    immer((set) => ({
      prelude: -1,
      ice: 0,
      mold: 0,
      rift: 0,
      crossing: 0,
      blur: 0,
      pier: 0,
      setPrelude: (num: number) => set(() => ({ prelude: num })),
      setIce: (num: number) => set(() => ({ ice: num })),
      setMold: (num: number) => set(() => ({ mold: num })),
      setRift: (num: number) => set(() => ({ rift: num })),
      setCrossing: (num: number) => set(() => ({ crossing: num })),
      setBlur: (num: number) => set(() => ({ blur: num })),
      setPier: (num: number) => set(() => ({ pier: num })),
      complete: () =>
        set(() => ({
          prelude: 999,
          ice: 999,
          mold: 999,
          rift: 999,
          crossing: 999,
          blur: 999,
          pier: 999,
        })),

      reset: () =>
        set(() => ({
          prelude: -1,
          ice: 0,
          mold: 0,
          rift: 0,
          crossing: 0,
          blur: 0,
          pier: 0,
        })),
    })),
    {
      name: "section-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // This is going to be a rabbit hole for login/logout/restore data
    }
  )
);
