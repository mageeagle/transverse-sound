"use client";
import AmbiPlayer from "@/components/sound/AmbiPlayer";
import { useLoading } from "@/hooks/useBufferLoading";
import { initiateSensors } from "@/hooks/useSensors";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useEffectOnce } from "react-use";
import * as Tone from "tone";

export default function Ambitest() {
  const tone = useLoading((s) => s.tone);

  const toneStart = () => {
    Tone.start().then(() => {
      Tone.getTransport().start();
    });
    console.log("context started");
    useLoading.getState().toneStart();

    initiateSensors();
  };
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
  const decoderLoaded = useLoading.getState().decoderLoaded;
  useEffectOnce(() => {
    initiateSensors();
    useLoading.getState().setDecoderOn(true);
  });
  return (
    <>
      <AmbiPlayerOmni />
      {decoderLoaded && <AmbiPlayer id={10} loop />}
      {!tone && (
        <div
          className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
          onClick={toneStart}
        >
          Touch to Test Ambisonics Orientation
        </div>
      )}
    </>
  );
}
