import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type MessageState = {
  // All in One State Changer
  classify: string;
  classifyHKList: string[];
  classifyEngList: string[];
  savedArr: number[];
  currentHighest: number;
  rating: number;
  now: string;
  playbackRate: number;
  setClassify: (str: string) => void;
  setNow: (str: string) => void;
  setClassifyEngList: (arr: string[]) => void;
  setClassifyHKList: (arr: string[]) => void;
  setSavedArr: (arr: number[]) => void;
  setCurrentHighest: (ind: number) => void;
  setRating: (ind: number) => void;
  setPlaybackRate: (ind: number) => void;
};

// Create the hook, with set functions
export const useClassification = create<MessageState>()(
  immer((set) => ({
    classify: "",
    classifyEngList: [],
    classifyHKList: [],
    savedArr: [],
    currentHighest: 0,
    rating: 0.5,
    now: "",
    playbackRate: 1,
    setClassify: (str) => set(() => ({ classify: str })),
    setNow: (str) => set(() => ({ now: str })),
    setClassifyEngList: (arr) => set(() => ({ classifyEngList: arr })),
    setClassifyHKList: (arr) => set(() => ({ classifyHKList: arr })),
    setSavedArr: (arr) => set(() => ({ savedArr: arr })),
    setCurrentHighest: (ind) => set(() => ({ currentHighest: ind })),
    setRating: (ind) => set(() => ({ rating: ind })),
    setPlaybackRate: (ind) => set(() => ({ playbackRate: ind }))
  }))
);
