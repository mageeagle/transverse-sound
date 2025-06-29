import { useSection } from "@/hooks/useSection";
import { useCallback, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";
import RoundButton from "./RoundButton";
import { useUI } from "@/hooks/useUI";
import { useLoading } from "@/hooks/useBufferLoading";
import { useObject } from "@/hooks/useObject";
import * as Tone from "tone";
import { useMessage } from "@/hooks/useMessage";

const StartExitButton = () => {
  const [mainOn, sectionOn, main, section, skipSection, ending] = useSection(
    useShallow((s) => [
      s.mainOn,
      s.sectionOn,
      s.main,
      s.section,
      s.skipSection,
      s.ending,
    ])
  );

  const language = useUI((s) => s.language);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  const aiLoaded = useObject((s) => s.aiLoaded);
  const handleSection = useCallback(() => {
    if (!deviceLoaded && aiLoaded) return;
    const s = useSection.getState();
    if (sectionOn) {
      if (!useMessage.getState().response && useMessage.getState().question) {
        useMessage
          .getState()
          .setResponse(
            language === "Cantonese"
              ? "我冇嘢講"
              : "I have the right to remain silent."
          );
        s.setSectionOn(false);
      }
      s.setEnding(true);
      return;
    }
    s.setSectionOn(true);
  }, [aiLoaded, deviceLoaded, sectionOn, language]);

  const handleMain = useCallback(() => {
    if (!deviceLoaded && aiLoaded) return;
    const s = useSection.getState();
    if (s.ending) {
      console.log("ending callback");
      s.setMainOn(false);
      s.reset();
      return;
    }
    if (mainOn && skipSection) {
      console.log("mainOn skipSection callback");
      s.setEnding(true);
      return;
    }
    if (mainOn && !skipSection) {
      console.log("mainOn non skipSection callback");

      s.setMainOn(false);
      s.reset();
      return;
    }
    s.setMainOn(true);
    Tone.start().then(() => {
      Tone.getTransport().start();
    });
  }, [deviceLoaded, aiLoaded, mainOn, skipSection]);

  return (
    <>
      {main && !sectionOn && (
        <RoundButton
          dark
          text={
            language === "English"
              ? mainOn
                ? "Exit"
                : "Enter"
              : mainOn
              ? "離開"
              : "進入"
          }
          callback={handleMain}
          className="fixed bottom-0 right-0 z-50 m-4"
        />
      )}
      {section !== 0 && mainOn && !skipSection && (
        <RoundButton
          dark
          text={
            language === "English"
              ? sectionOn
                ? "Stop"
                : "Start"
              : sectionOn
              ? "結束"
              : "開始"
          }
          callback={handleSection}
          className="fixed bottom-0 left-0 z-50 m-4"
        />
      )}
    </>
  );
};

export default StartExitButton;
