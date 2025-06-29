import { useHands } from "@/hooks/useHands";
import { useObject } from "@/hooks/useObject";
import { useViewport } from "@/hooks/useViewport";
import WasmFileset from "@/types/vision";
import { DrawingUtils, GestureRecognizer } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef } from "react";
import { useEffectOnce } from "react-use";
import { useShallow } from "zustand/shallow";

const HandGesture = () => {
  const [width, height] = useViewport(useShallow((s) => [s.width, s.height]));
  const animRef = useRef<number>(null);
  const layerRef = useRef<HTMLCanvasElement>(null);
  const [webcam, renFrame] = useObject(
    useShallow((s) => [s.webcam, s.renFrame])
  );
  //   const vision = use(visionRef);
  const gestureRecognizer = useRef<GestureRecognizer>(null);
  useEffectOnce(() => {
    let detection: GestureRecognizer;
    GestureRecognizer.createFromOptions(
      useObject.getState().vision as WasmFileset,
      {
        baseOptions: {
          modelAssetPath:
            "/assets/ai/vision/gesture_recognizer.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 1,
      }
    ).then((v) => {
      detection = v;
      gestureRecognizer.current = v;
      useObject.getState().setAILoaded(true);
    });
    return () => {
      detection?.close();
      useObject.getState().setAILoaded(false);
    }
  });

  const predictWebcam = useCallback(() => {
    if (!renFrame || !webcam?.video) return;
    if (
      typeof webcam !== "undefined" &&
      webcam != null &&
      webcam.video.readyState === 4
    ) {
      // Detect objects using detectForVideo.
      layerRef.current?.getContext("2d")!.clearRect(0, 0, width, height);
      if (gestureRecognizer.current)
        try {
          let startTimeMs = performance.now();
          const results = gestureRecognizer.current.recognizeForVideo(
            webcam?.video,
            startTimeMs
          );
          // console.log(results);
          if (results.landmarks) {
            results.landmarks.forEach((landmarks, i) => {
              let xSum = 0;
              let ySum = 0;
              if (i === 0) {
                landmarks.forEach((v) => {
                  xSum += v.x;
                  ySum += v.y;
                });
              }
              drawingUtils.current?.drawConnectors(
                landmarks,
                GestureRecognizer.HAND_CONNECTIONS,
                {
                  color: "#00FF00",
                  lineWidth: 5,
                }
              );
              drawingUtils.current?.drawLandmarks(landmarks, {
                color: "#FF0000",
                lineWidth: 2,
              });
              const xCen = xSum / 21;
              const yCen = ySum / 21;
              useHands.getState().setCentroid([xCen, yCen]);
              // [xCen, yCen]
            });
          }
          if (results.gestures.length > 0) {
            const categoryName = results.gestures[0][0].categoryName;
            useHands.getState().setCategory(categoryName);
          }
        } catch {}
    }
    // Call this function again to keep predicting when the browser is ready.
    animRef.current = requestAnimationFrame(predictWebcam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renFrame, gestureRecognizer, webcam?.video]);

  useEffect(() => {
    if (!renFrame || !webcam?.video || !gestureRecognizer) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(predictWebcam);
    return () => {
      animRef.current ? cancelAnimationFrame(animRef.current) : null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictWebcam]);

  const drawingUtils = useRef<DrawingUtils>(null);
  useEffectOnce(() => {
    const canvasCtx = layerRef.current?.getContext("2d")!;
    const draw = new DrawingUtils(canvasCtx);
    drawingUtils.current = draw;
    return () => {
      draw.close();
    };
  });

  return (
    <>
      <canvas
        className={"z-20 top-0 bottom-0 left-0 right-0 absolute opacity-50"}
        ref={layerRef}
        height={height}
        width={width}
      />
    </>
  );
};

export default HandGesture;
