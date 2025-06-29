import HandGesture from "@/components/mediapipe/HandGesture";
import WebcamWrapper from "@/components/mediapipe/WebcamWrapper";
import { useLoading } from "@/hooks/useBufferLoading";
import { useObject } from "@/hooks/useObject";
import { useEffectOnce } from "react-use";
import { useSection } from "@/hooks/useSection";
import RNBOCrossing from "@/components/sound/RNBOCrossing";
import Loading from "@/components/ui/Loading";

const Crossing = () => {
  const aiLoaded = useObject((s) => s.aiLoaded);
  const renFrame = useObject((s) => s.renFrame);
  useEffectOnce(() => {
    useSection.getState().setMapView(true);
    useSection.getState().setSkipSection(true);
    return () => {
      useSection.getState().setSkipSection(false);
      useLoading.getState().setDeviceLoaded(true);
      useSection.getState().setMapView(false);
    };
  });
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  return (
    <>
      {!renFrame && <Loading />}
      {aiLoaded && deviceLoaded && <WebcamWrapper />}
      <HandGesture />
      {aiLoaded && <RNBOCrossing />}
    </>
  );
};

export default Crossing;
