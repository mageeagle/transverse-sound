import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { createDevice, Device, TimeNow, MessageEvent } from "@rnbo/js";
import { useLoading } from "@/hooks/useBufferLoading";
import { useSegmentation } from "@/hooks/useSegmentation";
import { scaleClamp } from "@/helpers/mathsHelper";
import { useSection } from "@/hooks/useSection";
import { useRNBO } from "@/hooks/useRNBO";
import synthPatch from "@/rnbo/electric.json"

const RNBOElectric = () => {
  const synth = useRef<Device>(null);
  useEffect(() => {
    const context = Tone.getContext().rawContext;
    let device1: Device | null;
    const gain = new Tone.Gain(0.5).toDestination();
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
  }, []);
  const numCapture = useSegmentation((s) => s.capture);
  const percentage = useSegmentation((s) => s.percentage);

  useEffect(() => {
    if (!numCapture || numCapture > 10) return;
    const pitch = scaleClamp(1 - percentage, 0, 1, 54, 84);
    const event1 = new MessageEvent(TimeNow, "target", [numCapture]);
    const event2 = new MessageEvent(TimeNow, "freq", [pitch]);
    synth.current?.scheduleEvent(event1);
    synth.current?.scheduleEvent(event2);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (numCapture === 10) {
      const target = new MessageEvent(TimeNow, "target", [0]);
      const event1 = new MessageEvent(TimeNow, "harmonicity", [0.01]);
      const event2 = new MessageEvent(TimeNow, "mod", [100]);
      synth.current?.scheduleEvent(target);
      synth.current?.scheduleEvent(event1);
      synth.current?.scheduleEvent(event2);
      timeout.current = setTimeout(
        () => useSection.getState().setMainOn(false),
        12000
      );
      () => clearTimeout(timeout.current!);
    }
  }, [numCapture]);
  return <></>;
};

export default RNBOElectric;
