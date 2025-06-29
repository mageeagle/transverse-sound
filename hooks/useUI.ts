import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const uikey = {
  about: false,
  sensor: false,
  language: "Cantonese" as "Cantonese" | "English",
};

// Set type for store / Only for typescript
type UIState = {
  closePopup: (key: keyof typeof uikey) => void;
  openPopup: (key: keyof typeof uikey) => void;
  setLanguage: () => void;
};

// Create the hook, with set functions
export const useUI = create<UIState & typeof uikey>()(
  persist(
    immer((set) => ({
      ...uikey,
      closePopup: (key) => set((state) => ({ [key]: false })),
      openPopup: (key) => set((state) => ({ [key]: true })),
      setLanguage: () =>
        set((state) => ({
          language: state.language === "Cantonese" ? "English" : "Cantonese",
        })),
    })),
    {
      name: "section-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
