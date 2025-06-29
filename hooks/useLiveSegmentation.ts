import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type MessageState = {
  // All in One State Changer
  classify: string;
  HKList: string[];
  engList: string[];
  savedArr: string[][];
  currentHighest: number;
  rating: number;
  now: string;
  setClassify: (str: string) => void;
  setNow: (str: string) => void;
  setEngList: (arr: string[]) => void;
  setHKList: (arr: string[]) => void;
  setSavedArr: (arr: string[][]) => void;
  setCurrentHighest: (ind: number) => void;
  setRating: (ind: number) => void;
};

// Create the hook, with set functions
export const useLiveSegmentation = create<MessageState>()(
  immer((set) => ({
    classify: "",
    setClassify: (str) => set(() => ({ classify: str })),
    engList: [],
    HKList: [],
    setEngList: (arr) => set(() => ({ engList: arr })),
    setHKList: (arr) => set(() => ({ HKList: arr })),
    currentHighest: 0,
    setCurrentHighest: (ind) => set(() => ({ currentHighest: ind })),
    now: "",
    setNow: (str) => set(() => ({ now: str })),
    savedArr: [],
    setSavedArr: (arr) => set(() => ({ savedArr: arr })),
    rating: 0.5,
    setRating: (ind) => set(() => ({ rating: ind }))
  }))
);
