import { useLoading } from "@/hooks/useBufferLoading";
import { sectionLinks, useSection } from "@/hooks/useSection";
import { useSectionPersist } from "@/hooks/useSectionPersist";
import { useUI } from "@/hooks/useUI";
import Loading from "./Loading";
const buttonClass =
  "size-full place-content-center hover:bg-white hover:opacity-80 hover:text-black cursor-pointer transition";

export const sectionTitles = {
  prelude: {
    eng: "E-Plaza | Prelude",
    chi: "東廣場 | 序",
  },
  mold: {
    eng: "T-Crossing",
    chi: "工模巷 | T字路口",
  },
  ice: {
    eng: "Frozen Space",
    chi: "碎冰里 | 凝結空間",
  },
  crossing: {
    eng: "Crossing",
    chi: "船渡巷 | 十字路口",
  },
  electric: {
    eng: "Blurred Boundaries",
    chi: "車邊里 + 電路里 | 模糊邊界",
  },
  rift: {
    eng: "Time Rift - First Part",
    chi: "花紗里 | 時間裂縫 - 前段",
  },
  riftEnd: {
    eng: "Time Rift - Last Part",
    chi: "花紗里 | 時間裂縫 - 後段",
  },
  pier: {
    eng: "Waterfront | Outro",
    chi: "海濱 | 後記",
  },
};

export default function DemoSelection() {
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  const language = useUI((s) => s.language);
  const clickCallback = (
    section: keyof typeof sectionLinks | null | "riftEnd"
  ) => {
    const process = () => {
      if (section !== "riftEnd") useSection.getState().setMain(section);
      if (section === "rift") useSectionPersist.getState().setRift(-1);
      if (section === "riftEnd") {
        useSection.getState().setMain("rift");
        useSectionPersist.getState().setRift(999);
      }
      useSection.getState().setMainOn(true);
    };
    if (deviceLoaded) return;
    process();
  };
  return (
    <>
      {deviceLoaded && (
        <Loading />
      )}
      <div className="fixed size-full z-40">
        <div className="size-full grid grid-cols-2 md:grid-cols-4 gap-0 items-center justify-center text-center">
          {Object.entries(sectionTitles).map((v) => {
            return (
              <div
                key={v[0]}
                className={buttonClass}
                onClick={() => {
                  clickCallback(v[0] as keyof typeof sectionLinks | "riftEnd");
                }}
              >
                {language === "Cantonese" ? v[1].chi : v[1].eng}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
