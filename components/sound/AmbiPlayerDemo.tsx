import { useSection } from "@/hooks/useSection";
import AmbiPlayer from "./AmbiPlayer";

export default function AmbiPlayerDemo() {
  const sectionOn = useSection((s) => s.sectionOn);
  const ind = useSection((s) => s.section);
  const main = useSection((s) => s.main);
  return (
    <>
      {sectionOn && (main === "rift") && (ind !== 0) && (
        <AmbiPlayer
          id={ind}
          loop={ind === 2 || ind === 4 || ind === 6 ? false : true}
        />
      )}
    </>
  );
}
