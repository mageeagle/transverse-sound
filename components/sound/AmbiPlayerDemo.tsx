import { useSection } from "@/hooks/useSection";
import AmbiPlayer from "./AmbiPlayer";
import { useEffect } from "react";

export default function AmbiPlayerDemo() {
  const sectionOn = useSection((s) => s.sectionOn);
  const ind = useSection((s) => s.section);
  const main = useSection((s) => s.main);
  useEffect(() => {
      useSection.getState().setMapView(false);
  }, [])
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
