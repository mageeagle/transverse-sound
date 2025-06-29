import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const sectionLinks = {
  sections: "/assets/locations/sections.json",
  prelude: "/assets/locations/prelude.json",
  ice: "/assets/locations/ice.json",
  pier: "/assets/locations/pier.json",
  route: "/assets/locations/route.json",
  mold: null,
  electric: null,
  rift: null,
  crossing: null
};

// Set type for store / Only for typescript
type SectionState = {
  // All in One State Changer
  section: number;
  sectionOn: boolean;
  intro: boolean;
  ending: boolean;
  skipSection: boolean;
  mapView: boolean;

  main: keyof typeof sectionLinks | null;
  mainOn: boolean;

  setSection: (num: number) => void;
  setMain: (str: keyof typeof sectionLinks | null) => void;
  setIntro: (bool: boolean) => void;
  setEnding: (bool: boolean) => void;
  setSectionOn: (bool: boolean) => void;
  setMainOn: (bool: boolean) => void;
  setSkipSection: (bool: boolean) => void;
  setMapView: (bool: boolean) => void;
  reset: () => void;
};

// Create the hook, with set functions
export const useSection = create<SectionState>()(
  immer((set) => ({
    section: 0,
    sectionOn: false,
    intro: false,
    ending: false,
    skipSection: false,
    mapView: true,

    main: null,
    mainOn: false,
    setSection: (num: number) => set(() => ({ section: num })),
    setMain: (str: string | null) => set(() => ({ main: str })),
    setIntro: (bool) => set(() => ({ intro: bool })),
    setSkipSection: (bool) => set(() => ({ skipSection: bool })),
    setEnding: (bool) => set(() => ({ ending: bool })),
    setSectionOn: (bool) => set(() => ({ sectionOn: bool })),
    setMainOn: (bool) => set(() => ({ mainOn: bool })),
    setMapView: (bool) => set(() => ({ mapView: bool })),
    reset: () =>
      set(() => ({
        intro: false,
        ending: false,
        sectionOn: false,
      })),
  }))
);
