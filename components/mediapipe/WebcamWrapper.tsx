import Webcam from "react-webcam";
import { useObject } from "@/hooks/useObject";
import { useViewport } from "@/hooks/useViewport";
import { useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { useEffectOnce } from "react-use";

const WebcamWrapper = () => {
  const webcamRef = useRef<Webcam>(null);
  const [width, height] = useViewport(useShallow((s) => [s.width, s.height]));

  const videoConstraints = useMemo(() => {
    if (!width || !height) return null;
    let isMobile = true;
    //@ts-ignore
    if (navigator.userAgentData) isMobile = navigator.userAgentData.mobile;
    const w = width || window.innerWidth;
    const h = height || window.innerHeight;
    return {
      width: isMobile ? h : w,
      height: isMobile ? w : h,
      facingMode: "environment",
    };
  }, [width, height]);
  useEffectOnce(() => {
    return () => {
      useObject.getState().setRenFrame(false);
      if (webcamRef.current) useObject.getState().setWebcam(null);
    };
  });
  useEffect(() => {
    if (videoConstraints) return
    useObject.getState().setRenFrame(false)
  }, [videoConstraints])

  return (
    <>
      {videoConstraints && (
        <Webcam
          ref={webcamRef}
          muted={true}
          onUserMedia={() => {
            useObject.getState().setRenFrame(true);
            if (webcamRef.current)
              useObject.getState().setWebcam(webcamRef.current);
          }}
          videoConstraints={videoConstraints}
          height={videoConstraints.height}
          width={videoConstraints.width}
        />
      )}
    </>
  );
};

export default WebcamWrapper;
