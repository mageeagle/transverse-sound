import { useSection } from "@/hooks/useSection";
import { useCallback } from "react";
import RoundButton from "./RoundButton";
import { useUI } from "@/hooks/useUI";
import { useLoading } from "@/hooks/useBufferLoading";
import { useObject } from "@/hooks/useObject";

const DemoExit = () => {
  const language = useUI((s) => s.language);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  const aiLoaded = useObject((s) => s.aiLoaded);
  const handleSection = useCallback(() => {
    if (!deviceLoaded && aiLoaded) return;
    const s = useSection.getState();
    s.setMainOn(false);
    s.setSectionOn(false);
    s.setSection(0);
  }, [aiLoaded, deviceLoaded]);

  return (
    <RoundButton
      dark
      text={language === "English" ? "Exit" : "結束"}
      callback={handleSection}
      className="fixed bottom-0 right-0 z-50 m-4"
    />
  );
};

export default DemoExit;
