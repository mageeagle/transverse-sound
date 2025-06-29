"use client";
import { Stage, Layer, Circle, Rect } from "react-konva";
import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import { useViewport } from "@/hooks/useViewport";
import { useShallow } from "zustand/shallow";
import Konva from "konva";
import { clamp } from "@/helpers/mathsHelper";
import { useDemo } from "@/hooks/useDemo";

const TwoDSlider = () => {
  const [sliderOn, setSliderOn] = useState(false);
  const stageRef = useRef<Konva.Stage>(null);
  const [width, height] = useViewport(useShallow((s) => [s.width, s.height]));
  const [circlePos, setCirclePos] = useState([0, 0]);
  const xy = useDemo(s => s.xy)
  const dimensions = useMemo(
      () => (width > height / 2 ? height / 2 : width),
      [width, height]
    );
    const handleTouch = useCallback(() => {
      if (!stageRef.current || !sliderOn) return;
      const touchPos = stageRef.current.getPointerPosition()!;
      const x = clamp((touchPos.x - (width / 2 - dimensions / 2)) / dimensions, 0, 1)
      const y = clamp((touchPos.y - 10) / dimensions, 0, 1)
      useDemo.getState().setXY([x, y])
      setCirclePos([touchPos.x, touchPos.y]);
    }, [sliderOn, dimensions, width]);

    useEffect(() => {
        setCirclePos([(xy[0] * dimensions) + (width / 2 - dimensions / 2), (xy[1] * dimensions) + 10])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, height])
    
  return (
    <Stage
      className="z-10 top-0 bottom-0 left-0 right-0 absolute"
      width={width}
      height={height}
      ref={stageRef}
      onPointerUp={() => setSliderOn(false)}
      onPointerDown={() => setSliderOn(true)}
    >
      <Layer>
        <Rect
          x={width / 2 - dimensions / 2}
          y={10}
          width={dimensions}
          height={dimensions}
          stroke={"#22ffbd"}
          strokeWidth={2}
          strokeEnabled={true}
          onPointerMove={handleTouch}
          onClick={handleTouch}
        />
        <Circle
          x={circlePos[0]}
          y={circlePos[1]}
          radius={10}
          stroke="#22ffbd"
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default TwoDSlider;
