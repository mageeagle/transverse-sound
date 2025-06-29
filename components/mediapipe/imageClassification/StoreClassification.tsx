import ScrollVelocity from "@/components/react-bits/ScrollVelocity/ScrollVelocity";
import { useClassification } from "@/hooks/useClassification";
import { useUI } from "@/hooks/useUI";
import { useEffect, useState } from "react";
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
    //supabase
    const supaText =
      language === "English"
        ? listState.classifyEngList[listState.currentHighest]
        : listState.classifyHKList[listState.currentHighest];

    savedCatagories.forEach((ind, i) => {
      const text =
        language === "English"
          ? listState.classifyEngList[ind]
          : listState.classifyHKList[ind];
      if (i >= len) out.push(text);
    });
    setSavedList((s) => [...s, ...out]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedCatagories]);
  return (
    <div className="mt-7">
      <ScrollVelocity
        texts={savedList}
        velocity={200}
        className="custom-scroll-text text-4xl/18 opacity-50"
        numCopies={15}
      />
      {savedCatagories.length < 10 && (
        <div className="custom-scroll-text text-4xl/18 opacity-50"> {now} </div>
      )}
    </div>
  );
};

export default StoreClassification;
