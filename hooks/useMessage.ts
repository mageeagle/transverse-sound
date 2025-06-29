import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Set type for store / Only for typescript
type MessageState = {
  // All in One State Changer
  message: string;
  setMessage: (str: string) => void;
  response: string | null;
  setResponse: (str: string | null) => void;
  question: string | null;
  setQuestion: (str: string | null) => void;
  target: string | null;
  setTarget: (str: string | null) => void;
  acknowledge: string | null;
  setAcknowledge: (str: string | null) => void;
  subtitles: string | null;
  setSubtitles: (str: string | null) => void;
};

// Create the hook, with set functions
export const useMessage = create<MessageState>()(
  immer((set) => ({
    message: "",
    setMessage: (str) => set(() => ({ message: str })),
    response: null,
    setResponse: (str) => set(() => ({ response: str })),
    question: null,
    setQuestion: (str) => set(() => ({ question: str })),
    target: null,
    setTarget: (str) => set(() => ({ target: str })),
    acknowledge: null,
    setAcknowledge: (str) => set(() => ({ acknowledge: str })),
    subtitles: null,
    setSubtitles: (str) => set(() => ({ subtitles: str })),
  }))
);