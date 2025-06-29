import { fetchLink } from "@/helpers/fetcher";
import { useObject } from "@/hooks/useObject";
import { useUI } from "@/hooks/useUI";
import { useViewport } from "@/hooks/useViewport";
import { JSX, use, useState } from "react";
import { Layer, Rect, Stage, Text } from "react-konva";
import { useUpdateEffect } from "react-use";
import { useShallow } from "zustand/shallow";
const labelList = fetchLink("/assets/data/efficient_labels.json");
const ObjectFrame = ({ enabled = true }: { enabled?: boolean }) => {
  const [rectArray, setRectArray] = useState<JSX.Element[]>([]);
  const [textArray, setTextArray] = useState<JSX.Element[]>([]);
  const [width, height] = useViewport(useShallow((s) => [s.width, s.height]));
  const object = useObject((s) => s.object);
  const filter = useObject((s) => s.filter);
  const labels = use(labelList);

  useUpdateEffect(() => {
    if (!enabled) return;
    if (!object) {
      setRectArray([]);
    }
    const out: JSX.Element[] = [];
    const text: JSX.Element[] = [];
    object.forEach((obj, i) => {
      if (!obj.boundingBox) return;
      if (
        filter.length === 0 ||
        filter.includes(obj.categories[0].categoryName)
      ) {        
        out.push(
          <Rect
            key={i}
            x={obj.boundingBox.originX}
            y={obj.boundingBox.originY}
            width={obj.boundingBox.width}
            height={obj.boundingBox.height}
            stroke={"#22ffbd"}
            strokeWidth={2}
            strokeEnabled={true}
            fillEnabled={false}
          />
        );
        text.push(
          <Text
            key={"text" + i}
            x={obj.boundingBox.originX}
            y={obj.boundingBox.originY}
            fontSize={24}
            fill={"#22ffbd"}
            fillEnabled={true}
            text={
              useUI.getState().language === "Cantonese"
                ? labels.categoriesHK[labels.categories.indexOf(obj.categories[0].categoryName)]
                : obj.categories[0].categoryName
            }
            padding={4}
          />
        );
      }
    });
    setRectArray(out);
    setTextArray(text);
  }, [object]);
  return (
    <Stage
      className="z-10 top-0 bottom-0 left-0 right-0 absolute"
      width={width}
      height={height}
    >
      <Layer>
        {rectArray}
        {textArray}
      </Layer>
    </Stage>
  );
};

export default ObjectFrame;
