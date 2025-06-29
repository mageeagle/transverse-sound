import InteractiveSegmentation from "@/components/mediapipe/InteractiveSegmentation";
import WebcamWrapper from "@/components/mediapipe/WebcamWrapper";
import RNBOElectric from "@/components/sound/RNBOElectric";
import Loading from "@/components/ui/Loading";
import { useLoading } from "@/hooks/useBufferLoading";
import { useObject } from "@/hooks/useObject";
import { useSection } from "@/hooks/useSection";
import { useSegmentation } from "@/hooks/useSegmentation";
import { useEffectOnce } from "react-use";

const Electric = () => {
  useEffectOnce(() => useLoading.getState().setDeviceLoaded(false));
  useEffectOnce(() => {
    useSection.getState().setSkipSection(true);
    return () => {
      useSection.getState().setSkipSection(false);
      useSegmentation.getState().setCapture(0);
    };
  });
  const renFrame = useObject((s) => s.renFrame);
  const aiLoaded = useObject((s) => s.aiLoaded);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  return (
    <>
      {!renFrame && <Loading />}
      {aiLoaded && deviceLoaded && <WebcamWrapper />}
      <InteractiveSegmentation />
      {aiLoaded && <RNBOElectric />}
    </>
  );
};
export default Electric;
