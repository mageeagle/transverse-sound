import { useRef } from "react";
import Image from "next/image";
import { useLoading } from "@/hooks/useBufferLoading";
import * as Tone from "tone";
import { useUI } from "@/hooks/useUI";
import RoundButton from "./RoundButton";
import TranslateIcon from "./icons/TranslateIcon";
import { initiateSensors } from "@/hooks/useSensors";
import { useSectionPersist } from "@/hooks/useSectionPersist";

const StartDemo = () => {
  const audio = useRef<HTMLAudioElement>(null);
  const language = useUI((s) => s.language);
  const toneStart = () => {
    useSectionPersist.getState().complete();
    audio.current?.play().then(() => {
      Tone.start().then(() => {
        Tone.getTransport().start();
      });
      console.log("context started");
      useLoading.getState().toneStart();
    });
    initiateSensors();
  };
  return (
    <div className="z-[60] absolute top-0 bottom-0 left-0 right-0 w-svw h-dvh flex items-center justify-center bg-radial from-[#f5cac8] via-[#3469b2] to-[#301627] to-90%">
      <div
        className="flex flex-col items-center h-dvh gap-2 bg-none"
        onClick={toneStart}
      >
        <Image
          className="w-auto p-4 max-h-1/2"
          alt="logo"
          src="/assets/image/main-hero.png"
          width={1010}
          height={975}
          priority
        />
        <audio ref={audio} className="hidden">
          <source src="/assets/audio/silent.mp3" type="audio/mp3"></source>
        </audio>
        <div className="flex flex-col items-center gap-10" onClick={toneStart}>
          {language === "Cantonese" && (
            <div className="flex flex-col items-center p-4 gap-2">
              <h4 className="select-none text-2xl font-light font-stretch-ultra-condensed tracking-widest text-[#22ffbd]">
                互動聲音|自由模式
              </h4>
              <p className="text-xs text-[#22ffbd]">
                可於此頁面任意啓動於聲音旅程中的聲音互動
              </p>
              <p className="text-xs text-[#22ffbd]">
                了解更多關於旅程中各段落的概念
              </p>
              <p className="text-xs text-[#22ffbd]">
                以及不用身處觀塘亦能自由遊玩聲音互動
              </p>
            </div>
          )}
          {language === "Cantonese" && (
            <h4 className="select-none text-2xl font-light font-stretch-ultra-condensed tracking-widest text-[#22ffbd]">
              按我開始
            </h4>
          )}
          {language === "English" && (
            <div className="flex flex-col items-center p-4 gap-2">
              <h4 className="text-2xl font-thin font-stretch-ultra-condensed tracking-tight text-[#22ffbd] max-w-screen">
                Interactive Audio | Free Mode
              </h4>
              <p className="text-xs text-[#22ffbd]">
                Activate any of the sound interactions in the Sound Journey from
                this page.
              </p>
              <p className="text-xs text-[#22ffbd]">
                Learn more about the concepts of each section of the journey,
              </p>
              <p className="text-xs text-[#22ffbd]">
                and play the Sound Interaction freely without being in Kwun
                Tong.
              </p>
            </div>
          )}
          {language === "English" && (
            <h4 className="select-none text-2xl font-light font-stretch-ultra-condensed tracking-tight text-[#22ffbd]">
              Touch to Start
            </h4>
          )}
        </div>
      </div>
      <RoundButton
        className="bottom-0 right-0 fixed m-4 z-[70]"
        icon={<TranslateIcon />}
        callback={useUI.getState().setLanguage}
      />
    </div>
  );
};
export default StartDemo;
