import { useCallback, useEffect, useRef } from "react";
import * as Tone from "tone";
import { createDevice, Device, TimeNow, MessageEvent } from "@rnbo/js";
import { useMotion, useUpdateEffect } from "react-use";
import { scale } from "@/helpers/mathsHelper";
import { useEffectChain } from "@/hooks/useEffectChain";
import { useSection } from "@/hooks/useSection";
import { useLoading } from "@/hooks/useBufferLoading";
import { useRNBO } from "@/hooks/useRNBO";
import { useDemo } from "@/hooks/useDemo";
import karplusPatch from "@/rnbo/IceLane.json"

const RNBOIce = () => {
  const synth = useRef<Device>(null);
  const accel = useMotion();
  const freeze = useEffectChain((s) => s.freeze);
  const section = useSection((s) => s.section);
  const xy = useDemo((s) => s.xy)
  useEffect(() => {
    const context = Tone.getContext().rawContext;
    let device1: Device | null;
    //@ts-ignore
    createDevice({ context: context, patcher: karplusPatch }, useRNBO.getState().device).then((dev) => {
      synth.current = dev;
      device1 = dev;
      dev.node.connect(context.destination);
      useLoading.getState().setDeviceLoaded(true);
      const event3 = new MessageEvent(TimeNow, "toggle", [1]);
      synth.current?.scheduleEvent(event3);
    });
    return () => {
      const event3 = new MessageEvent(TimeNow, "toggle", [0]);
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

  useUpdateEffect(() => {
    if (!accel) return;
    const absAccel = Math.abs(
      Math.pow(
        Math.pow(accel.acceleration.x!, 2) +
          Math.pow(accel.acceleration.y!, 2) +
          Math.pow(accel.acceleration.z!, 2),
        0.5
      )
    );
    if (absAccel > 6 && absAccel <= 20) {
      const event1 = new MessageEvent(TimeNow + 50, "springTrigger", [1]);
      synth.current?.scheduleEvent(event1);
    }
    if (absAccel > 20) {
      const event1 = new MessageEvent(TimeNow + 50, "karplusTrigger", [1]);
      synth.current?.scheduleEvent(event1);
    }
  }, [accel]);

  const playback = useCallback(() => {
    setTimeout(() => {
      const event1 = new MessageEvent(
        TimeNow + 50,
        Math.random() > 0.5 ? "karplusTrigger" : "springTrigger",
        [1]
      );
      synth.current?.scheduleEvent(event1);
      if (useSection.getState().section === 1) playback();
    }, scale(Math.random(), 0, 1, 3000, 5000));
  }, []);

  useEffect(() => {
    if (section === 1) playback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useUpdateEffect(() => {
    const one = scale(xy[0]!, 0, 1, 40, 1000);
    const two = scale(xy[0]!, 0, 1, 600, 40);
    const three = scale(xy[1]!, 0, 1, 0, 20);
    const four = scale(xy[1]!, 0, 1, 160, 10);
    const event1 = new MessageEvent(TimeNow + 50, "sprintElasicity", [one]);
    synth.current?.scheduleEvent(event1);
    const event2 = new MessageEvent(TimeNow + 50, "karplusFrequency", [two]);
    synth.current?.scheduleEvent(event2);
    const event3 = new MessageEvent(TimeNow + 50, "pitch", [three]);
    synth.current?.scheduleEvent(event3);
    const event4 = new MessageEvent(TimeNow + 50, "decay", [four]);
    synth.current?.scheduleEvent(event4);
  }, [xy])

  useUpdateEffect(() => {
    console.log(freeze);
    if (freeze) {
      const event1 = new MessageEvent(TimeNow, "freeze", [1]);
      synth.current?.scheduleEvent(event1);
      const event2 = new MessageEvent(TimeNow + 500, "direct", [0]);
      synth.current?.scheduleEvent(event2);
    }
    if (freeze === false) {
      const event1 = new MessageEvent(TimeNow + 50, "freeze", [0]);
      synth.current?.scheduleEvent(event1);
      const event2 = new MessageEvent(TimeNow + 50, "direct", [1]);
      synth.current?.scheduleEvent(event2);
    }
  }, [freeze]);

  return null;
};

export default RNBOIce;
