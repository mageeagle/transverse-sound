import { useLoading } from "@/hooks/useBufferLoading";
import { useSection } from "@/hooks/useSection";
import { useUI } from "@/hooks/useUI";
const buttonClass =
  "size-full place-content-center hover:bg-white hover:opacity-80 hover:text-black cursor-pointer transition";

export default function SectionSelector({ num }: { num: number }) {
  const language = useUI((s) => s.language);
  const mapView = useSection((s) => s.mapView);
  const main = useSection((s) => s.main);
  const section = useSection((s) => s.section);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  const Selector = ({ num }: { num: number }) => {
    return (
      <div
        className={buttonClass}
        onClick={() => {
          if (section === num) return 
          if (main === "pier") {
            if (!deviceLoaded && section !== 0) return
            if (deviceLoaded && section !== 0) useSection.getState().setSection(0);
          } else {
              useSection.getState().setSection(0);
          }
          setTimeout(() => {
            if (main === "pier") {
              if (deviceLoaded) return;
              useSection.getState().setSection(num);
              useSection.getState().setSectionOn(true);
            } else {
              useSection.getState().setSection(num);
              useSection.getState().setSectionOn(true);
            }
          }, 20);
        }}
      >
        {language === "Cantonese" ? `區域${num}` : `Area${num}`}
      </div>
    );
  };
  return (
    <div
      className={`fixed size-full top-0 bottom-0 right-0 left-0 bg-black opacity-80 ${
        mapView ? "z-10" : "z-40"
      }`}
    >
      <div className="size-full grid grid-cols-2 md:grid-cols-4 gap-0 items-center justify-center text-center">
        {[...Array(num).keys()].map((val, i) => (
          <Selector key={i + 1} num={val + 1} />
        ))}
      </div>
    </div>
  );
}
