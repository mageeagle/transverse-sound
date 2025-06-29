import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { createDevice, Device, TimeNow, MessageEvent } from "@rnbo/js";
import { useLoading } from "@/hooks/useBufferLoading";
import { useRNBO } from "@/hooks/useRNBO";
import { useUpdateEffect } from "react-use";
import { useLiveSegmentation } from "@/hooks/useLiveSegmentation";
import synthPatch from "@/rnbo/shimmerwind.json"

const RNBOWind = ({ low, high }: { low: number; high: number }) => {
  const synth = useRef<Device>(null);
  const rating = useLiveSegmentation((s) => s.rating);

  useEffect(() => {
    const context = Tone.getContext().rawContext;
    let device1: Device | null;
    const gain = new Tone.Gain(0.5).toDestination();
    //@ts-ignore
    createDevice(
      //@ts-ignore
      { context: context, patcher: synthPatch },
      useRNBO.getState().device
    ).then((dev) => {
      synth.current = dev;
      device1 = dev;
      dev.node.connect(gain.input);
      useLoading.getState().setDeviceLoaded(true);
      const event3 = new MessageEvent(TimeNow + 50, "toggle", [1]);
      synth.current.scheduleEvent(event3);
      const event4 = new MessageEvent(TimeNow + 75, "toggle", [0]);
      synth.current.scheduleEvent(event4);
      const event5 = new MessageEvent(TimeNow + 100, "toggle", [1]);
      synth.current.scheduleEvent(event5);
      const event6 = new MessageEvent(TimeNow + 60, "low", [low]);
      synth.current.scheduleEvent(event6);
      const event7 = new MessageEvent(TimeNow + 70, "high", [high]);
      synth.current.scheduleEvent(event7);
      useRNBO.getState().setDevice(dev);
    });
    return () => {
      const event3 = new MessageEvent(TimeNow + 50, "toggle", [0]);
      device1?.scheduleEvent(event3);
      setTimeout(() => {
        device1?.node.disconnect(gain.input);
        createDevice(
          {
            //@ts-ignore
            context: Tone.getContext().rawContext,
            //@ts-ignore
            patcher: useRNBO.getState().emptyPatch,
          },
          device1
        ).then((dev) => {
          useRNBO.getState().setDevice(dev)
          useLoading.getState().setDeviceLoaded(false);
        });
        gain.dispose();
        device1 = null;
        synth.current = null;
      }, 2000);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateEffect(() => {
    const event4 = new MessageEvent(TimeNow + 50, "freq", [Math.abs(rating - 1)]);
    synth.current?.scheduleEvent(event4);
  }, [rating]);

  return null;
};

export default RNBOWind;
