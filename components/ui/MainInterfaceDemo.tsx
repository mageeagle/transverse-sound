import { useSection } from "@/hooks/useSection";
import { useShallow } from "zustand/shallow";
import Ice from "../sections/ice/Ice";
import Rift from "../sections/rift/Rift";
import PierMain from "../sections/pier/PierMain";
import Prelude from "../sections/prelude/Prelude";
import Mold from "../sections/mold/Mold";
import Crossing from "../sections/crossing/Crossing";
import Electric from "../sections/electric/Electric";
import DemoExit from "./DemoExit";
import SectionSelector from "./SectionSelector";
import { useSectionPersist } from "@/hooks/useSectionPersist";
import AmbiPlayerDemo from "../sound/AmbiPlayerDemo";
import RoundButton from "./RoundButton";
import { useUI } from "@/hooks/useUI";
import { useClassification } from "@/hooks/useClassification";
import { scale } from "@/helpers/mathsHelper";
import TwoDSlider from "./TwoDSlider";
import BigGreenButton from "./BigGreenButton";
import { useEffectChain } from "@/hooks/useEffectChain";
import Dialog from "./Dialog";
import DemoAbout from "./DemoAbout";

const MainInterfaceDemo = () => {
  const language = useUI((s) => s.language);
  const [main, mainOn, mapView, sectionOn] = useSection(
    useShallow((s) => [s.main, s.mainOn, s.mapView, s.sectionOn])
  );
  const riftSection = useSectionPersist((s) => s.rift);
  const freeze = useEffectChain((s) => s.freeze);

  const SectionSelection = () => {
    return (
      <RoundButton
        dark
        callback={() => {
          if (main === "pier") {
            useSection.getState().setSectionOn(false);
            useSection.getState().setSection(0);
            return;
          }
          useSection.getState().setMapView(!useSection.getState().mapView);
        }}
        text={
          main === "pier"
            ? language === "English"
              ? "Area Change"
              : "區域轉換"
            : mapView
            ? language === "English"
              ? "Area Change"
              : "區域轉換"
            : language === "English"
            ? "Continue Interaction"
            : "繼續互動"
        }
        className={"fixed top-0 right-0 m-4 z-50 text-sm"}
      />
    );
  };

  return (
    mainOn && (
      <>
        <div
          className={`absolute left-0 right-0 top-0 bottom-0 m-auto text-center h-dvh overflow-hidden ${
            mapView ? "z-40" : "z-10"
          }`}
        >
          <>
            {main === "prelude" && <Prelude />}
            {main === "ice" && <Ice />}
            {main === "mold" && <Mold />}
            {main === "rift" && riftSection > 0 && <Rift />}
            {main === "rift" && riftSection < 0 && <AmbiPlayerDemo />}
            {main === "crossing" && <Crossing />}
            {main === "electric" && <Electric />}
            {main === "pier" && <PierMain />}
          </>
        </div>

        {main === "ice" && <TwoDSlider />}
        {main === "ice" && (
          <div className="fixed left-24 right-24 bottom-4 z-[100]">
            <BigGreenButton
              clickCallback={() => {
                useEffectChain.getState().setFreeze(!freeze);
              }}
              disabled={false}
              cantonese={!freeze ? "冰封聲音" : "解封聲音"}
              english={!freeze ? "Freeze Sound" : "Unfreeze Sound"}
              name={"freeze"}
            />
          </div>
        )}

        {main === "prelude" && <SectionSelector num={4} />}
        {main === "rift" && riftSection < 0 && <SectionSelector num={7} />}
        {main === "pier" && <SectionSelector num={4} />}
        {(main === "prelude" || (main === "pier" && sectionOn)) && (
          <SectionSelection />
        )}
        <Dialog
          dark={true}
          className={"m-4 fixed bottom-0 left-0 z-50"}
          contents={<DemoAbout />}
          text={language === "Cantonese" ? "關於" : "About"}
        />
        {main === "rift" && riftSection > 0 && (
          <input
            type="range"
            min={0}
            max="100"
            // value="40"
            onChange={(e) => {
              useClassification
                .getState()
                .setPlaybackRate(scale(Number(e.target.value), 0, 100, 0, 1));
            }}
            className="z-[100] range text-white [--range-bg:#22ffbd] [--range-thumb:#3469b2] [--range-fill:0] absolute top-0 left-0 right-0 w-full p-4"
          />
        )}
        <DemoExit />
      </>
    )
  );
};

export default MainInterfaceDemo;
