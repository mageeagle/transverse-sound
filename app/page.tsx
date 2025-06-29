"use client";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useUI } from "@/hooks/useUI";
import { useSection } from "@/hooks/useSection";
import { useLoading } from "@/hooks/useBufferLoading";
import { useEffectOnce } from "react-use";
import MediapipeFetch from "@/components/mediapipe/MediapipeFetch";
import ClientViewport from "@/components/mediapipe/ClientViewport";
import Terms from "@/components/ui/Terms";
import StartDemo from "@/components/ui/StartDemo";
import DemoSelection from "@/components/ui/DemoSelection";
import DialogChain from "@/components/ui/DialogChain";

export default function Homepage() {
  const [browser, setBrowser] = useState(true);
  useEffectOnce(() => {
    setBrowser(navigator.userAgent.match(/chrome|crios/i) !== null);
  });
  const mainOn = useSection((s) => s.mainOn);
  const language = useUI((s) => s.language);
  const tone = useLoading((s) => s.tone);
  const decoderLoaded = useLoading((s) => s.decoderLoaded);

  const AmbiPlayerOmni = useMemo(
    () =>
      dynamic(() => import("@/components/sound/AmbiPlayerOmni"), {
        loading: () => (
          <div className="absolute left-0 right-0 top-0 bottom-0 m-auto text-center z-10 w-full h-full">
            Loading Sound
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const WakeLockToggle = useMemo(
    () =>
      dynamic(() => import("@/components/ui/WakeLockToggle"), {
        loading: () => (
          <div className="absolute left-0 right-0 top-0 bottom-0 m-auto text-center z-10 w-full h-full">
            Loading WakeLock
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const RNBOInit = useMemo(
    () =>
      dynamic(() => import("@/components/sound/RNBOInit"), {
        loading: () => (
          <div className="absolute left-0 right-0 top-0 bottom-0 m-auto text-center z-10 w-full h-full">
            Loading RNBO
          </div>
        ),
        ssr: false,
      }),
    []
  );
  const MainInterfaceDemo = useMemo(
    () =>
      dynamic(() => import("@/components/ui/MainInterfaceDemo"), {
        loading: () => (
          <div className="absolute left-0 right-0 top-0 bottom-0 m-auto text-center z-10 w-full h-full">
            Loading RNBO
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return (
    <div>
      <AmbiPlayerOmni />
      <div className={"w-svw h-dvh relative flex flex-col select-none text-white"}>
        {tone && !mainOn && <DemoSelection />}
        <ClientViewport />
        <MainInterfaceDemo />
      </div>
      <MediapipeFetch />
      {!tone && <StartDemo />}

      {decoderLoaded && <RNBOInit />}
      <WakeLockToggle />
      {!mainOn && <DialogChain className="bottom-0 left-0 fixed m-4 z-[100]" />}
      {!browser && (
        <Terms
          contents={
            <>
              {language === "Cantonese"
                ? "你正在使用Chrome以外的瀏覽器，程式會有部份功能失效。使用Chrome安裝此程式才能獲得最佳體驗。"
                : "If you are using a browser other than Chrome, some features of the program will not work. Install this app using Chrome to get the best experience."}
            </>
          }
          handleCloseModal={() => setBrowser(true)}
        />
      )}
    </div>
  );
}
