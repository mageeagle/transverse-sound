import { useSection } from "@/hooks/useSection";
import { useEffect } from "react";
import { useEffectOnce } from "react-use";
import { useSectionPersist } from "@/hooks/useSectionPersist";
import WebcamWrapper from "@/components/mediapipe/WebcamWrapper";
import ObjectRecognition from "@/components/mediapipe/objectRecognition/ObjectRecognition";
import ObjectFrame from "@/components/mediapipe/objectRecognition/ObjectFrame";
import { useObject } from "@/hooks/useObject";
import RNBOPrelude from "@/components/sound/RNBOPrelude";
import { useLoading } from "@/hooks/useBufferLoading";
import Loading from "@/components/ui/Loading";

const Prelude = () => {
  const introStage = useSectionPersist((s) => s.prelude);
  useEffect(() => {
    if (introStage < 5) useObject.getState().setFilter(["person"]);
    if (introStage >= 5) useObject.getState().setFilter([]);
    return () => useObject.getState().setFilter([]);
  }, [introStage]);

  const aiLoaded = useObject((s) => s.aiLoaded);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  const renFrame = useObject((s) => s.renFrame);

  useEffectOnce(() => {
    useLoading.getState().setDeviceLoaded(false);
    useSection.getState().setSkipSection(true);
    useSection.getState().setMapView(true);
    return () => useSection.getState().setMapView(false);
  });
  return (
    <>
      {!renFrame && <Loading />}
      {aiLoaded && deviceLoaded && <WebcamWrapper />}
      <ObjectRecognition />
      <ObjectFrame />
      {aiLoaded && <RNBOPrelude />}
    </>
  );
};

export default Prelude;
