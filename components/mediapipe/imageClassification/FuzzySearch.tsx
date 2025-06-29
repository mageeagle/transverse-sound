import RandomPlaybackPanner from "@/components/sound/RandomPlaybackPanner";
import { useClassification } from "@/hooks/useClassification";
import Fuse, { FuseResult } from "fuse.js";
import { JSX, useRef, useState } from "react";
import { useUpdateEffect } from "react-use";

const fixedList = ["salt farm", "construction", "industrial", "commercial"];
const soundList = [
  "salt.mp3",
  "construction.mp3",
  "industrial.mp3",
  "typing.mp3",
];

const FuzzySearch = () => {
  const savedCatagories = useClassification((s) => s.savedArr);
  const fuse = useRef(
    new Fuse(fixedList, {
      includeScore: true,
      threshold: 0.95,
    })
  );
  const [classifiedArray, setClassifiedArray] = useState<FuseResult<string>[]>(
    []
  );
  const [soundArray, setSoundArray] = useState<JSX.Element[]>([]);
  useUpdateEffect(() => {
    if (!savedCatagories) return;
    const out: FuseResult<string>[] = [];
    const outSound: JSX.Element[] = [];
    const listState = useClassification.getState();
    let outString = listState.classify;
    const engList = listState.classifyEngList;
    const len = classifiedArray.length || 0;
    savedCatagories.forEach((ind, i) => {
      if (i >= len) {
        outString = outString + engList[ind] + " ";
        const result = fuse.current?.search(engList[ind]);
        out.push(result[result.length - 1]);
        outSound.push(
          <RandomPlaybackPanner
            url={`/assets/audio/rift-samples/${
              soundList[result[result.length - 1].refIndex]
            }`}
            key={`list ${i}`}
            volume={-6}
          />
        );
      }
    });
    listState.setClassify(outString);
    setClassifiedArray((s) => [...s, ...out]);
    setSoundArray((s) => [...s, ...outSound]);
  }, [savedCatagories]);

  useUpdateEffect(() => {
    console.log(classifiedArray);
  }, [classifiedArray]);

  return <>{soundArray}</>;
};

export default FuzzySearch;
