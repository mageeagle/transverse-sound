/* eslint-disable @next/next/no-img-element */
import { useObject } from "@/hooks/useObject";
import { useSectionPersist } from "@/hooks/useSectionPersist";
import { useSegmentation } from "@/hooks/useSegmentation";
import { useViewport } from "@/hooks/useViewport";
import WasmFileset from "@/types/vision";
import { InteractiveSegmenter, MPMask } from "@mediapipe/tasks-vision";
import { JSX, useCallback, useRef, useState } from "react";
import { useEffectOnce } from "react-use";
import { useShallow } from "zustand/shallow";

const InteractiveSegmentation = () => {
  const [width, height] = useViewport(useShallow((s) => [s.width, s.height]));
  const imgRef = useRef<HTMLImageElement>(null);
  const layerRef = useRef<HTMLCanvasElement>(null);
  const eventRef = useRef<PointerEvent>(null);
  const [screen, setScreen] = useState<string | null>();
  const [webcam] = useObject(
    useShallow((s) => [s.webcam])
  );
  const interactiveSegmenter = useRef<InteractiveSegmenter>(null);
  useEffectOnce(() => {
    let detection: InteractiveSegmenter;
    InteractiveSegmenter.createFromOptions(
      useObject.getState().vision as WasmFileset,
      {
        baseOptions: {
          modelAssetPath: `/assets/ai/vision/magic_touch.tflite`,
          delegate: "GPU",
        },
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      }
    ).then((v) => {
      detection = v;
      interactiveSegmenter.current = v;
      useObject.getState().setAILoaded(true);
    });
    return () => {
      detection?.close();
      useObject.getState().setAILoaded(false);
    };
  });

  const diu = useCallback(() => {
    if (!screen || !imgRef.current) return;
    if (!interactiveSegmenter) return;
    interactiveSegmenter.current?.segment(
      imgRef.current,
      {
        keypoint: {
          x: eventRef.current?.screenX! / width,
          y: eventRef.current?.screenY! / height,
        },
      },
      (result) => {
        drawSegmentation(result.categoryMask!);
      }
    );
    if (numCapture < 10) {
      setImageArr((s) => [
        ...s,
        <img
          key={`image-${numCapture}`}
          className={"z-30 top-0 bottom-0 left-0 right-0 absolute opacity-10"}
          src={screen!}
          alt={""}
        />,
      ]);
      useSegmentation
        .getState()
        .setCapture(useSegmentation.getState().capture + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  /**
   * Draw segmentation result
   */
  const drawSegmentation = (mask: MPMask) => {
    const width = mask.width;
    const height = mask.height;
    const maskData = mask.getAsFloat32Array();
    const ctx = layerRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#00000000";
    // uncomment below to refresh canvas each segmentation, this is commented out for the collage effect
    // ctx.clearRect(0, 0, width, height);
    ctx.fillStyle =
      numCapture % 3 === 0
        ? "#22ffbd"
        : numCapture % 3 === 1
        ? "#3469b2"
        : "#f5cac8";
    const total = maskData.length;
    let count = 0;
    maskData.forEach((category, index) => {
      if (Math.round(category * 255.0) === 0) {
        count += 1;
        const x = (index + 1) % width;
        const y = (index + 1 - x) / width;
        ctx.fillRect(x, y, 1, 1);
      }
    });
    const percentage = count / total;
    useSegmentation.getState().setPercentage(percentage);
  };
  const numCapture = useSegmentation((s) => s.capture);
  const introStage = useSectionPersist((s) => s.blur);
  const capture = useCallback(
    (event: any) => {
      if (!introStage || introStage === 2) return;
      if (introStage === 1) {
        useSectionPersist.getState().setBlur(2);
      }
      eventRef.current = event;
      setScreen(webcam?.getScreenshot());
    },
    [webcam, introStage]
  );
  const [imageArr, setImageArr] = useState<JSX.Element[]>([]);

  return (
    <div onClick={capture}>
      <canvas
        className={"z-20 top-0 bottom-0 left-0 right-0 absolute"}
        ref={layerRef}
        height={height}
        width={width}
        onClick={capture}
      />
      <img
        ref={imgRef}
        className={"z-30 top-0 bottom-0 left-0 right-0 absolute opacity-30"}
        src={screen!}
        onLoad={diu}
        alt={""}
      />
      {imageArr}
    </div>
  );
};

export default InteractiveSegmentation;
