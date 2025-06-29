import { useLiveSegmentation } from "@/hooks/useLiveSegmentation";
import { useUI } from "@/hooks/useUI";

const Background = () => {
  const rating = useLiveSegmentation((s) => s.rating);
  const language = useUI.getState().language;

  return (
    <div className="fixed bottom-0 left-0 right-0 text-center  text-[#22ffbd]">
      <div>{language === "Cantonese" ? "不能界定" : "Undefined"}</div>
      <div
        className="radial-progress"
        //@ts-ignore
        style={{ "--value": rating * 100 }}
        role="progressbar"
      >
        {(rating * 100).toFixed(1)}
      </div>
    </div>
  );
};

export default Background;
