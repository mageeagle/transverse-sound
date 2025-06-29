import ObjectRecognition from "@/components/mediapipe/objectRecognition/ObjectRecognition";
import WebcamWrapper from "@/components/mediapipe/WebcamWrapper";

import { useObject } from "@/hooks/useObject";
import { useEffectOnce } from "react-use";
import { useSection } from "@/hooks/useSection";
import ObjectFrame from "@/components/mediapipe/objectRecognition/ObjectFrame";
import { useLoading } from "@/hooks/useBufferLoading";
import RNBOSequencer from "@/components/sound/RNBOSequencer";
import Loading from "@/components/ui/Loading";

const Mold = () => {
  useEffectOnce(() => useLoading.getState().setDeviceLoaded(false));
  const renFrame = useObject((s) => s.renFrame);
  const aiLoaded = useObject((s) => s.aiLoaded);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  useEffectOnce(() => {
    useObject.getState().setFilter(["person"]);
    useSection.getState().setSkipSection(true);
    return () => {
      useSection.getState().setSkipSection(false);
      useObject.getState().setFilter([]);
    };
  });
  return (
    <div>
      {!renFrame && <Loading />}
      {aiLoaded && deviceLoaded && <WebcamWrapper />}
      <ObjectRecognition />
      <ObjectFrame enabled={renFrame} />
      {aiLoaded && <RNBOSequencer />}
    </div>
  );
};

export default Mold;
