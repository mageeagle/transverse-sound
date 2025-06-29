import { useViewport } from "@/hooks/useViewport";
import { useEffect } from "react";

const ClientViewport = () => {
  useEffect(() => {
    useViewport.getState().setWidth(window.innerWidth);
    const handleResize = () =>
      useViewport.getState().setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    useViewport.getState().setHeight(window.innerHeight);
    const handleResize = () =>
      useViewport.getState().setHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return null;
};

export default ClientViewport;
