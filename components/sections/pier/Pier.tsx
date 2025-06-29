import Background from "@/components/mediapipe/imageSegmentation/Background";
import ImageSegmentation from "@/components/mediapipe/imageSegmentation/ImageSegmentation";
import WebcamWrapper from "@/components/mediapipe/WebcamWrapper";
import { useSection } from "@/hooks/useSection";
import { useLoading } from "@/hooks/useBufferLoading";
import { useObject } from "@/hooks/useObject";
import { useEffectOnce } from "react-use";
import RNBOWind from "@/components/sound/RNBOWind";
import Loading from "@/components/ui/Loading";

const Pier = ({ low, high }: { low: number; high: number }) => {
  useEffectOnce(() => useLoading.getState().setDeviceLoaded(false));
  const section = useSection((s) => s.section);
  const sectionOn = useSection((s) => s.sectionOn);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  const aiLoaded = useObject((s) => s.aiLoaded);
  const renFrame = useObject((s) => s.renFrame);

  return (
    <>
      {!renFrame && <Loading />}
      {deviceLoaded && aiLoaded && <WebcamWrapper />}
      <ImageSegmentation />
      <Background />
      {sectionOn && section && aiLoaded && <RNBOWind low={low} high={high} />}
    </>
  );
};

export default Pier;
