import { use, useEffect, useRef } from "react";
import * as Tone from "tone";
import { createDevice, Device, TimeNow, MessageEvent } from "@rnbo/js";
import { useUpdateEffect } from "react-use";
import { fetchLink } from "@/helpers/fetcher";
import { useLoading } from "@/hooks/useBufferLoading";
import { useObject } from "@/hooks/useObject";
import { useSectionPersist } from "@/hooks/useSectionPersist";
import { useSection } from "@/hooks/useSection";
import { useRNBO } from "@/hooks/useRNBO";
import sequencerPatch from "@/rnbo/prelude.json"

const RNBOPrelude = () => {
  const synth = useRef<Device>(null);
  const objectDetected = useObject((s) => s.object);
  const introStage = useSectionPersist((s) => s.prelude);
  const section = useSection((s) => s.section);
  const deviceLoaded = useLoading((s) => s.deviceLoaded);
  //   const ready = useTest(sect)
  const counter = useRef(0);

  useEffect(() => {
    const context = Tone.getContext().rawContext;
    let device1: Device | null;
    createDevice(
      //@ts-ignore
      { context: context, patcher: sequencerPatch },
      useRNBO.getState().device
    ).then((dev) => {
      synth.current = dev;
      device1 = dev;
      dev.node.connect(context.destination);
      const event1 = new MessageEvent(TimeNow + 50, "toggle", [1]);
      dev.scheduleEvent(event1);
      useLoading.getState().setDeviceLoaded(true);
    });
    return () => {
      const event1 = new MessageEvent(TimeNow + 50, "toggle", [0]);
      device1?.scheduleEvent(event1);
      setTimeout(() => {
        device1?.node.disconnect(context.destination);
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
        device1 = null;
        synth.current = null;
      }, 2000);
    };
  }, []);

  const ppl = useRef(0);

  useUpdateEffect(() => {
    if (!synth.current) return;
    let count = 0;
    if (introStage < 5) {
      objectDetected.forEach((obj) => {
        if (obj.categories[0].categoryName === "person") {
          count += 1;
        }
      });
    } else {
      count = objectDetected.length;
    }

    const num = ppl.current;
    if (count !== num) {
      if (num < count) {
        ppl.current = num + 1;
        // trigger
        const event1 = new MessageEvent(TimeNow + 50, "trigger", [1]);
        synth.current.scheduleEvent(event1);
      }
    }
    counter.current += 1;
    if (counter.current % 10 === 0) {
      if (num > count) {
        ppl.current = num - 1;
      }
    }
  }, [objectDetected]);

  useEffect(() => {
    if (!deviceLoaded) return;
    const time = 10000;
    if (section === 1) {
      // release (ms)
      const event1 = new MessageEvent(TimeNow + 50, "release", [50, time]);
      synth.current?.scheduleEvent(event1);
      // freq-low
      const event2 = new MessageEvent(TimeNow + 50, "freq-low", [100, time]);
      synth.current?.scheduleEvent(event2);
      // freq-high
      const event3 = new MessageEvent(TimeNow + 50, "freq-high", [900, time]);
      synth.current?.scheduleEvent(event3);
      // beating
      const event4 = new MessageEvent(TimeNow + 50, "beating-low", [0.5, time]);
      synth.current?.scheduleEvent(event4);
      // beating
      const event5 = new MessageEvent(TimeNow + 50, "beating-high", [5, time]);
      synth.current?.scheduleEvent(event5);
    }
    if (section === 2) {
      // release (ms)
      const event1 = new MessageEvent(TimeNow + 50, "release", [1000, time]);
      synth.current?.scheduleEvent(event1);
      // freq-low
      const event2 = new MessageEvent(TimeNow + 50, "freq-low", [100, time]);
      synth.current?.scheduleEvent(event2);
      // freq-high
      const event3 = new MessageEvent(TimeNow + 50, "freq-high", [900, time]);
      synth.current?.scheduleEvent(event3);
      // beating
      const event4 = new MessageEvent(TimeNow + 50, "beating-low", [6, time]);
      synth.current?.scheduleEvent(event4);
      // beating
      const event5 = new MessageEvent(TimeNow + 50, "beating-high", [15, time]);
      synth.current?.scheduleEvent(event5);
    }
    if (section === 3) {
      // release (ms)
      const event1 = new MessageEvent(TimeNow + 50, "release", [2000, time]);
      synth.current?.scheduleEvent(event1);
      // freq-low
      const event2 = new MessageEvent(TimeNow + 50, "freq-low", [100, time]);
      synth.current?.scheduleEvent(event2);
      // freq-high
      const event3 = new MessageEvent(TimeNow + 50, "freq-high", [330, time]);
      synth.current?.scheduleEvent(event3);
      // beating
      const event4 = new MessageEvent(TimeNow + 50, "beating-low", [100, time]);
      synth.current?.scheduleEvent(event4);
      // beating
      const event5 = new MessageEvent(TimeNow + 50, "beating-high", [
        200,
        time,
      ]);
      synth.current?.scheduleEvent(event5);
    }
    if (section === 4) {
      // release (ms)
      const event1 = new MessageEvent(TimeNow + 50, "release", [5000, time]);
      synth.current?.scheduleEvent(event1);
      // freq-low
      const event2 = new MessageEvent(TimeNow + 50, "freq-low", [130, time]);
      synth.current?.scheduleEvent(event2);
      // freq-high
      const event3 = new MessageEvent(TimeNow + 50, "freq-high", [132, time]);
      synth.current?.scheduleEvent(event3);
      // beating
      const event4 = new MessageEvent(TimeNow + 50, "beating-low", [300, time]);
      synth.current?.scheduleEvent(event4);
      // beating
      const event5 = new MessageEvent(TimeNow + 50, "beating-high", [
        500,
        time,
      ]);
      synth.current?.scheduleEvent(event5);
    }
  }, [section, deviceLoaded]);

  return null;
};

export default RNBOPrelude;
