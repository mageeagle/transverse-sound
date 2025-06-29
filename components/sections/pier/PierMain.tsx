import { useSection } from "@/hooks/useSection";
import Pier from "./Pier";
import { useEffect } from "react";

const PierMain = () => {
  const section = useSection((s) => s.section);
  const sectionOn = useSection((s) => s.sectionOn);

  useEffect(() => {
    if (!sectionOn) {
      useSection.getState().setMapView(false);
    }
    if (sectionOn) {
      useSection.getState().setMapView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionOn]);
  return (
    <>
      {section === 1 && sectionOn && <Pier low={96.3} high={84.2} />}
      {section === 2 && sectionOn && <Pier low={60.1} high={48.5} />}
      {section === 3 && sectionOn && <Pier low={72.5} high={84.3} />}
      {section === 4 && sectionOn && <Pier low={75.4} high={90.5} />}
    </>
  );
};

export default PierMain;
