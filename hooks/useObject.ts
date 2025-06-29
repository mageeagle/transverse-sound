import WasmFileset from "@/types/vision";
import { Detection } from "@mediapipe/tasks-vision";
import Webcam from "react-webcam";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const objectkey = {
  object: [] as Detection[],
  renFrame: false,
  webcam: null as Webcam | null,
  vision: null as WasmFileset | null,
  filter: [] as string[],
  aiLoaded: false,
};

// Set type for store / Only for typescript
type objectState = {
  setObject: (arr: Detection[]) => void;
  setRenFrame: (bool: boolean) => void;
  setAILoaded: (bool: boolean) => void;
  setWebcam: (arr: Webcam | null) => void;
  setVision: (arr: WasmFileset) => void;
  setFilter: (arr: string[]) => void;
};

// Create the hook, with set functions
export const useObject = create<objectState & typeof objectkey>()(
  immer((set) => ({
    ...objectkey,
    setObject: (obj) => set(() => ({ object: obj })),
    setRenFrame: (obj) => set(() => ({ renFrame: obj })),
    setAILoaded: (obj) => set(() => ({ aiLoaded: obj })),
    setWebcam: (obj) => set(() => ({ webcam: obj })),
    setVision: (obj) => set(() => ({ vision: obj })),
    setFilter: (obj) => set(() => ({ filter: obj })),
  }))
);
