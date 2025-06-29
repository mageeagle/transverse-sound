import { useRNBO } from "@/hooks/useRNBO";
import { createDevice } from "@rnbo/js";
import { useEffect } from "react";
import * as Tone from "tone";

const RNBOInit = () => {
  useEffect(() => {
    if (!useRNBO.getState().device) {
      createDevice(
        //@ts-ignore
        { context: Tone.getContext().rawContext, patcher: useRNBO.getState().emptyPatch }
      ).then((device) => useRNBO.getState().setDevice(device));
    }
  }, []);
  
  return null;
};
export default RNBOInit;
