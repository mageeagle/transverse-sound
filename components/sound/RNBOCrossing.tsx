import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { createDevice, Device, TimeNow, MessageEvent } from "@rnbo/js";
import { useLoading } from "@/hooks/useBufferLoading";
import { scaleClamp } from "@/helpers/mathsHelper";
import { useHands } from "@/hooks/useHands";
import { useSectionPersist } from "@/hooks/useSectionPersist";
import { useRNBO } from "@/hooks/useRNBO";
import synthPatch from "@/rnbo/crossing.json"

const RNBOCrossing = () => {
  const synth = useRef<Device>(null);
  const introStage = useSectionPersist((s) => s.crossing);
  useEffect(() => {
    if (!synthPatch) return;
    const context = Tone.getContext().rawContext;
    let device1: Device | null;
    //@ts-ignore
    createDevice({ context: context, patcher: synthPatch }, useRNBO.getState().device ).then((dev) => {
      synth.current = dev;
      device1 = dev;
      dev.node.connect(context.destination);
      useLoading.getState().setDeviceLoaded(true);
      const event3 = new MessageEvent(TimeNow + 50, "toggle", [1]);
      synth.current.scheduleEvent(event3);
      useRNBO.getState().setDevice(dev)
    });
    return () => {
      const event3 = new MessageEvent(TimeNow + 50, "toggle", [0]);
      device1?.scheduleEvent(event3);
      setTimeout(() => {
        device1?.node.disconnect(context.destination);
        createDevice(
          //@ts-ignore
          { context: Tone.getContext().rawContext, patcher: useRNBO.getState().emptyPatch },
          device1
        ).then(dev => {
          useRNBO.getState().setDevice(dev)
          useLoading.getState().setDeviceLoaded(false);
        })
        device1 = null;
        synth.current = null;
      }, 2000);
    };
  }, []);

  const category = useHands((s) => s.category);
  const centroid = useHands((s) => s.centroid);
  const gesture = useRef<"Closed_Fist" | "Pointing_Up">(null);
  const guard = useRef(0);
  useEffect(() => {
    if (!gesture.current || !centroid) return;
    if (centroid[0] === 0 && centroid[1] === 0) return;
    guard.current++;
    if (guard.current % 5 !== 0) return;
    if (gesture.current === "Closed_Fist" && introStage >= 5) {
      //   random_metro (1 - 5000)
      const event1 = new MessageEvent(TimeNow + 50, "random_metro", [
        scaleClamp(centroid[0], 0.25, 0.75, 20, 5000),
      ]);
      synth.current?.scheduleEvent(event1);
      //   gogogo (0.0001 - 1)
      const event2 = new MessageEvent(TimeNow + 50, "gogogo", [
        scaleClamp(centroid[1], 0.25, 0.75, 0, 1),
      ]);
      synth.current?.scheduleEvent(event2);
    }
    if (gesture.current === "Pointing_Up" && introStage >= 3) {
      //   freq_shift (-4000 to 4000)
      const event1 = new MessageEvent(TimeNow + 50, "freq_shift", [
        scaleClamp(centroid[0], 0.25, 0.75, -4000, 4000),
      ]);
      synth.current?.scheduleEvent(event1);
      //   rota_vibe_lfo (1. to 100.)
      const event2 = new MessageEvent(TimeNow + 50, "gogogo", [
        scaleClamp(centroid[1], 0.25, 0.75, 1, 100),
      ]);
      synth.current?.scheduleEvent(event2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centroid]);

  useEffect(() => {
    if (category === "Closed_Fist" && gesture.current !== "Closed_Fist")
      gesture.current = "Closed_Fist";
    if (category === "Pointing_Up" && gesture.current !== "Pointing_Up")
      gesture.current = "Pointing_Up";
  }, [category]);

  return null;
};

export default RNBOCrossing;
