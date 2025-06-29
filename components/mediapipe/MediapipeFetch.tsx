import { useObject } from "@/hooks/useObject";
import { FilesetResolver } from "@mediapipe/tasks-vision";
import { use, useEffect } from "react";

const visionFunc = async () => {
  const vis = await FilesetResolver.forVisionTasks(
    // "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    "/assets/ai/vision/wasm"
  );
  return vis;
};
const visionPromise = visionFunc();

const MediapipeFetch = () => {
  const vision = use(visionPromise);

  useEffect(() => {
    if (vision) useObject.getState().setVision(vision);
  }, [vision]);

  return null;
};

export default MediapipeFetch;
