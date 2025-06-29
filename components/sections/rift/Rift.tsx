import ImageClassification from "@/components/mediapipe/imageClassification/ImageClassification";
import WebcamWrapper from "@/components/mediapipe/WebcamWrapper";

import { useLoading } from "@/hooks/useBufferLoading";
import { useClassification } from "@/hooks/useClassification";
import { useSection } from "@/hooks/useSection";
import { useSectionPersist } from "@/hooks/useSectionPersist";
import { useEffect, useMemo, useRef } from "react";
import { useEffectOnce } from "react-use";
import { Player } from "tone";

const Rift = () => {
  const intro = useSectionPersist((s) => s.rift);
  const nowPlaying = useRef<Player>(null);
  const savedArr = useClassification((s) => s.savedArr);
  const storeNum = useMemo(() => savedArr.length, [savedArr]);
  const ending = useSection((s) => s.ending);
  const sectionOn = useSection((s) => s.sectionOn);

  useEffect(() => {
    if (!(intro >= 8)) {
      useSection.getState().setMapView(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionOn]);

  useEffectOnce(() => {
    useLoading.getState().setDecoderOn(true);
    useSection.getState().setSkipSection(true);
    useLoading.getState().setDeviceLoaded(true);
    return () => {
      useLoading.getState().setDeviceLoaded(false);
      useLoading.getState().setDecoderOn(false);
      useSection.getState().setSkipSection(false);
      if (nowPlaying.current) {
        nowPlaying.current.dispose();
      }
    };
  });
  useEffect(() => {
    if (ending) {
      useSection.getState().setMainOn(false);
      useSection.getState().setEnding(false);
    }
  }, [ending]);

  return (
    <>
      <div className={intro > 8 && intro < 999 ? "opacity-25" : ""}>
        {intro >= 7 && <WebcamWrapper />}
        {intro >= 7 && <ImageClassification />}
      </div>
    </>
  );
};

export default Rift;
