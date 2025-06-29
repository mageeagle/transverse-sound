import { useObject } from "@/hooks/useObject";
import { useUI } from "@/hooks/useUI";
import WasmFileset from "@/types/vision";
import { ImageClassifier } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { useClassification } from "@/hooks/useClassification";
import StoreClassification from "./StoreClassification";
import ImageClassificationLabels from "./ImageClassificationLabels";
import FuzzySearch from "./FuzzySearch";
import TextDetector from "./TextDetector";
import { useEffectOnce } from "react-use";

const ImageClassification = () => {
  const language = useUI((s) => s.language);
  const cantoneseList = useClassification((s) => s.classifyHKList);
  const animRef = useRef<number>(null);
  const [webcam, renFrame] = useObject(
    useShallow((s) => [s.webcam, s.renFrame])
  );
  const imageClassifier = useRef<ImageClassifier>(null);
  useEffectOnce(() => {
    useClassification.getState().setSavedArr([]);
    let detection: ImageClassifier;
    ImageClassifier.createFromOptions(
      useObject.getState().vision as WasmFileset,
      {
        baseOptions: {
          modelAssetPath: `/assets/ai/vision/efficientnet_lite0.tflite`,
          delegate: "GPU",
        },
        maxResults: 5,
        runningMode: "VIDEO",
        scoreThreshold: 0.1,
      }
    ).then((v) => {
      detection = v;
      imageClassifier.current = v;
      useObject.getState().setAILoaded(true);
    });
    return () => {
      detection?.close();
      useObject.getState().setAILoaded(false);
    };
  });

  const predictWebcam = useCallback(() => {
    if (!renFrame || !webcam) return;
    if (
      typeof webcam !== "undefined" &&
      webcam != null &&
      webcam.video?.readyState === 4 &&
      imageClassifier.current
    ) {
      if (useClassification.getState().savedArr.length > 10) return;
      let startTimeMs = performance.now();
      const detections = imageClassifier.current.classifyForVideo(
        webcam?.video!,
        startTimeMs
      );

      let outstr = "";
      detections.classifications[0].categories.forEach((v) => {
        if (v.score > 0.1) {
          outstr += `${
            language === "English" ? v.categoryName : cantoneseList[v.index + 1]
          } `;
        }
      });
      useClassification.getState().setNow(outstr);
      if (detections.classifications[0].categories[0]) {
        const v = detections.classifications[0].categories[0];
        if (v.score > 0.1)
          useClassification.getState().setCurrentHighest(v.index + 1);
      }
    }
    // Call this function again to keep predicting when the browser is ready.
    animRef.current = requestAnimationFrame(predictWebcam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renFrame, webcam, language]);

  useEffect(() => {
    if (!renFrame || !webcam?.video || !imageClassifier) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(predictWebcam);
    return () => {
      animRef.current ? cancelAnimationFrame(animRef.current) : null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictWebcam]);

  return (
    <div
      className="absolute w-full h-full top-0 z-[100]"
      onClick={() => {
        const s = useClassification.getState();
        if (s.savedArr.length <= 10) {
          s.setSavedArr([
            ...useClassification.getState().savedArr,
            useClassification.getState().currentHighest,
          ]);
        }
      }}
    >
      <ImageClassificationLabels />
      <StoreClassification />
      <FuzzySearch />
      <TextDetector />
    </div>
  );
};
export default ImageClassification;
