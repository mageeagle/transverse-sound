import ScrollVelocity from "@/components/react-bits/ScrollVelocity/ScrollVelocity";
import { useClassification } from "@/hooks/useClassification";
import { useUI } from "@/hooks/useUI";
import { JSX, useEffect, useState } from "react";
const StoreClassification = () => {
  const [savedList, setSavedList] = useState<string[]>([]);
  const savedCatagories = useClassification((s) => s.savedArr);
  const now = useClassification((s) => s.now);
  const language = useUI((s) => s.language);
  
  useEffect(() => {
    if (savedCatagories.length > 10 || !savedCatagories) return;
    const out: string[] = [];
    const len = savedList?.length || 0;
    const listState = useClassification.getState();
    savedCatagories.forEach((ind, i) => {
      if (i >= len)
        out.push(
          language === "English"
            ? listState.classifyEngList[ind]
            : listState.classifyHKList[ind]
        );
    });
    setSavedList((s) => [...s, ...out]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedCatagories]);
  return (
    <div className="mt-7">
        <div className="custom-scroll-text text-4xl/18 opacity-50"> {now} </div>
    </div>
  );
};

export default StoreClassification;
