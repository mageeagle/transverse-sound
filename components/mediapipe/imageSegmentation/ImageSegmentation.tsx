import { useEffectChain } from "@/hooks/useEffectChain";
import { useLiveSegmentation } from "@/hooks/useLiveSegmentation";
import { useObject } from "@/hooks/useObject";
import { useViewport } from "@/hooks/useViewport";
import WasmFileset from "@/types/vision";
import { ImageSegmenter, ImageSegmenterResult } from "@mediapipe/tasks-vision";
import { useCallback, useEffect, useRef } from "react";
import { useEffectOnce } from "react-use";
import { useShallow } from "zustand/shallow";

const legendColors = [
  [255, 197, 0, 255], // Vivid Yellow
  [128, 62, 117, 255], // Strong Purple
  [255, 104, 0, 255], // Vivid Orange
  [166, 189, 215, 255], // Very Light Blue
  [193, 0, 32, 255], // Vivid Red
  [206, 162, 98, 255], // Grayish Yellow
  [129, 112, 102, 255], // Medium Gray
  [0, 125, 52, 255], // Vivid Green
  [246, 118, 142, 255], // Strong Purplish Pink
  [0, 83, 138, 255], // Strong Blue
  [255, 112, 92, 255], // Strong Yellowish Pink
  [83, 55, 112, 255], // Strong Violet
  [255, 142, 0, 255], // Vivid Orange Yellow
  [179, 40, 81, 255], // Strong Purplish Red
  [244, 200, 0, 255], // Vivid Greenish Yellow
  [127, 24, 13, 255], // Strong Reddish Brown
  [147, 170, 0, 255], // Vivid Yellowish Green
  [89, 51, 21, 255], // Deep Yellowish Brown
  [241, 58, 19, 255], // Vivid Reddish Orange
  [35, 44, 22, 255], // Dark Olive Green
  [0, 161, 194, 255], // Vivid Blue
];

const ImageSegmentation = () => {
  const [width, height] = useViewport(useShallow((s) => [s.width, s.height]));
  const animRef = useRef<number>(null);
  const layerRef = useRef<HTMLCanvasElement>(null);
  const [webcam, renFrame] = useObject(
    useShallow((s) => [s.webcam, s.renFrame])
  );
  const imageSegmenter = useRef<ImageSegmenter>(null);
  const freeze = useEffectChain((s) => s.freeze);

  useEffectOnce(() => {
    useEffectChain.getState().setFreeze(false);
    let detection: ImageSegmenter;
    ImageSegmenter.createFromOptions(
      useObject.getState().vision as WasmFileset,
      {
        baseOptions: {
          modelAssetPath:
            "/assets/ai/vision/deeplab_v3.tflite",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      }
    ).then((v) => {
      detection = v;
      imageSegmenter.current = v;
      useObject.getState().setAILoaded(true);
    });
    return () => {
      detection?.close();
      useObject.getState().setAILoaded(false);
    };
  });

  const predictWebcam = useCallback(() => {
    if (!renFrame || !webcam?.video || !imageSegmenter) return;
    if (
      typeof webcam !== "undefined" &&
      webcam != null &&
      webcam.video.readyState === 4 &&
      imageSegmenter.current
    ) {
      let startTimeMs = performance.now();
      imageSegmenter.current.segmentForVideo(
        webcam?.video,
        startTimeMs,
        callbackForVideo
      );
      // Call this function again to keep predicting when the browser is ready.
    }
    animRef.current = requestAnimationFrame(predictWebcam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renFrame, imageSegmenter, webcam]);

  const callbackForVideo = useCallback(
    (result: ImageSegmenterResult) => {
      if (!result.categoryMask) return;
      const canvasCtx = layerRef.current?.getContext("2d");
      if (!canvasCtx) return;
      let imageData = canvasCtx.getImageData(0, 0, width, height).data;
      const mask = result.categoryMask.getAsFloat32Array();
      let j = 0;
      const outArr = Array.from({ length: legendColors.length }, () => 0);
      const maskLen = mask.length;
      for (let i = 0; i < maskLen; ++i) {
        const maskVal = Math.round(mask[i] * 255.0);
        const ind = maskVal % legendColors.length;
        const legendColor = legendColors[ind];
        imageData[j] = (legendColor[0] + imageData[j]) / 2;
        imageData[j + 1] = (legendColor[1] + imageData[j + 1]) / 2;
        imageData[j + 2] = (legendColor[2] + imageData[j + 2]) / 2;
        imageData[j + 3] = (legendColor[3] + imageData[j + 3]) / 2;
        j += 4;
        outArr[ind] += 1;
      }
      const uint8Array = new Uint8ClampedArray(imageData.buffer);
      const dataNew = new ImageData(uint8Array, width, height);
      canvasCtx.putImageData(dataNew, 0, 0);
      if (imageSegmenter.current) {
        let outstr = "";
        const outarr: string[][] = [];
        const labels = imageSegmenter.current.getLabels();
        outArr.forEach((v, i) => {
          const percentage = v / maskLen;
          if (percentage > 0.1 && i != 0) {
            const per = (percentage * 100).toFixed(1);
            outstr += `${labels[i]}: ${per} `;
            outarr.push([labels[i], per]);
          }
          if (i === 0) useLiveSegmentation.getState().setRating(percentage);
        });
        useLiveSegmentation.getState().setSavedArr(outarr);
      }
    },
    [width, height]
  );

  useEffect(() => {
    if (!renFrame || !webcam?.video || !imageSegmenter) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(predictWebcam);
    return () => {
      animRef.current ? cancelAnimationFrame(animRef.current) : null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [predictWebcam]);

  useEffect(() => {
    if (freeze) {
      cancelAnimationFrame(animRef.current!);
      webcam?.video?.pause();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freeze]);

  return (
    <canvas
      className={"z-20 top-0 bottom-0 left-0 right-0 absolute opacity-50"}
      ref={layerRef}
      height={height}
      width={width}
      onClick={() => {
        if (renFrame) useEffectChain.getState().setFreeze(true)
      }}
    />
  );
};

export default ImageSegmentation;
