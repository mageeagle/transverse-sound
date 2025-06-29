import { useObject } from "@/hooks/useObject";
import { ObjectDetector } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/shallow";
import WasmFileset from "@/types/vision";
import { useEffectOnce } from "react-use";

const ObjectRecognition = () => {
  const animRef = useRef<number>(null);
  const [webcam, renFrame, vision] = useObject(
    useShallow((s) => [s.webcam, s.renFrame, s.vision])
  );
  const objectDect = useRef<ObjectDetector>(null);
  useEffectOnce(() => {
    let detection: ObjectDetector;
    ObjectDetector.createFromOptions(
      useObject.getState().vision as WasmFileset,
      {
        baseOptions: {
          modelAssetPath: `/assets/ai/vision/efficientdet_lite0.tflite`,
          delegate: "GPU",
        },
        scoreThreshold: 0.4,
        runningMode: "VIDEO",
        maxResults: 8,
      }
    ).then((v) => {
      detection = v;
      objectDect.current = v;
      useObject.getState().setAILoaded(true);
    });
    return () => {
      detection?.close();
      useObject.getState().setAILoaded(false);
    };
  });
  const predictWebcam = useCallback(() => {
    if (!renFrame || !webcam?.video || !objectDect) return;
    // Detect objects using detectForVideo.
    if (
      typeof webcam !== "undefined" &&
      webcam != null &&
      webcam.video.readyState === 4 &&
      objectDect.current
    ) {
      let startTimeMs = performance.now();
      const detections = objectDect.current.detectForVideo(
        webcam?.video,
        startTimeMs
      );
      useObject.getState().setObject(detections.detections);
    }
    // Call this function again to keep predicting when the browser is ready.
    animRef.current = requestAnimationFrame(predictWebcam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renFrame, objectDect, webcam]);

  useEffect(() => {
    if (!renFrame || !webcam?.video || !objectDect) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(predictWebcam);
    return () => {
      animRef.current ? cancelAnimationFrame(animRef.current) : null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictWebcam]);

  return null;
};

export default ObjectRecognition;
