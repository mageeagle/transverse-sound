import { use, useEffect, useRef } from "react";
import * as Tone from "tone";
import { createDevice, Device, TimeNow, MessageEvent } from "@rnbo/js";
import { useUpdateEffect } from "react-use";
import { fetchLink } from "@/helpers/fetcher";
import { useLoading } from "@/hooks/useBufferLoading";
import { useObject } from "@/hooks/useObject";
import { scaleClamp } from "@/helpers/mathsHelper";
import { useRNBO } from "@/hooks/useRNBO";
import sequencerPatch from "@/rnbo/human-seq.json"

const RNBOSequencer = () => {
  const synth = useRef<Device>(null);
  const objectDetected = useObject((s) => s.object);

  useEffect(() => {
    const context = Tone.getContext().rawContext;
    let device1: Device | null;
    //@ts-ignore
    createDevice({ context: context, patcher: sequencerPatch }, useRNBO.getState().device).then((dev) => {
      synth.current = dev;
      device1 = dev;
      dev.node.connect(context.destination);
      const event1 = new MessageEvent(TimeNow + 50, "in1", [1]);
      dev.scheduleEvent(event1);
      useLoading.getState().setDeviceLoaded(true);
    });
    return () => {
      const event1 = new MessageEvent(TimeNow + 50, "in1", [0]);
      device1?.scheduleEvent(event1);
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

  const ppl = useRef(0);
  const counter = useRef(0);

  useUpdateEffect(() => {
    if (!synth.current) return;
    counter.current++;
    if (counter.current % 5 !== 0) return;
    let count = 0;
    let scoreSum = 0;
    let areaSum = 0;
    const scoreArr: number[] = [];
    const areaArr: number[] = [];
    objectDetected.forEach((obj) => {
      if (obj.categories[0].categoryName === "person") {
        count += 1;
        scoreSum += obj.categories[0].score;
        scoreArr.push(obj.categories[0].score);
        const area = obj.boundingBox?.height! * obj.boundingBox?.width!;
        areaArr.push(area);
        areaSum += area;
      }
    });

    // No Use
    const scoreMin = Math.min(...scoreArr);

    // 2 - 8th note incoming pitch 2-15
    // const areaMin = Math.min(...areaArr);
    const scoreAvg = scoreSum / scoreArr.length;
    const event2 = new MessageEvent(TimeNow + 50, "in2", [
      scaleClamp(scoreAvg, 0.2, 0.95, 10, 20),
    ]);
    // 3 - 16th note incoming pitch 20-50
    const areaMax = Math.max(...areaArr);
    const event3 = new MessageEvent(TimeNow + 50, "in3", [
      scaleClamp(areaMax, 1000000, 2000000, 20, 50),
    ]);
    // 4 - 32th note incoming pitch 1000-5000
    const scoreMax = Math.max(...scoreArr);
    const event4 = new MessageEvent(TimeNow + 50, "in4", [
      scaleClamp(scoreMax, 0.4, 0.95, 1000, 5000),
    ]);
    // 13 - Selection for delay preset ( 1 - 300, 2 - 400, 3 - 600, 4 - 800, 5 - 900), 300, 900 particular effective, normal just use 400 or 800
    const areaAvg = areaSum / areaArr.length;
    const event13 = new MessageEvent(TimeNow + 50, "in13", [
      Math.round(scaleClamp(areaAvg, 100000, 2000000, 1, 5)),
    ]);
    // 14 - Delay feedback 0 - 0.8
    // const event14 = new MessageEvent(TimeNow, "in14", [
    //   scaleClamp(scoreAvg, 0.2, 0.95, 0, 0.1),
    // ]);
    synth.current.scheduleEvent(event2);
    synth.current.scheduleEvent(event3);
    synth.current.scheduleEvent(event4);
    synth.current.scheduleEvent(event13);
    // synth.current.scheduleEvent(event14);
    // 8 - reset all grid to nil // bang

    const num = ppl.current;
    if (count !== num) {
      if (num < count) {
        ppl.current = num + 1;
        // 12 - Trigger water droplet
        const event1 = new MessageEvent(TimeNow + 50, "in12", [1]);
        synth.current.scheduleEvent(event1);
        // 5 - Gate for 8th note
        if (ppl.current === 1) {
          const event2 = new MessageEvent(TimeNow + 50, "in5", [1]);
          synth.current.scheduleEvent(event2);
        }
        // 6 - Gate for 16th note
        if (ppl.current === 2) {
          const event3 = new MessageEvent(TimeNow + 50, "in6", [1]);
          synth.current.scheduleEvent(event3);
        }
        // 7 - Gate for 32th note
        if (ppl.current === 3) {
          const event4 = new MessageEvent(TimeNow + 50, "in7", [1]);
          synth.current.scheduleEvent(event4);
        }
        // console.log(ppl.current);

        // console.log("add");
      }
      if (counter.current % 20 !== 0) return;
      if (num > count) {
        ppl.current = num - 1;
        console.log(ppl.current);
        if (ppl.current === 0) {
          // 9 - Activate 8th grid fade out
          const event1 = new MessageEvent(TimeNow + 50, "in5", [0]);
          synth.current.scheduleEvent(event1);
          const event2 = new MessageEvent(TimeNow + 50, "in9", [1]);
          synth.current.scheduleEvent(event2);
        }
        if (ppl.current === 2) {
          // 10 - Activate 16th grid fade out
          const event3 = new MessageEvent(TimeNow + 50, "in10", [1]);
          synth.current.scheduleEvent(event3);
          const event1 = new MessageEvent(TimeNow + 50, "in6", [0]);
          synth.current.scheduleEvent(event1);
        }
        if (ppl.current === 4) {
          // 11 - Activate 32th grid fade out (Takes a long time)
          const event4 = new MessageEvent(TimeNow + 50, "in11", [1]);
          synth.current.scheduleEvent(event4);
          const event1 = new MessageEvent(TimeNow + 50, "in7", [0]);
          synth.current.scheduleEvent(event1);
        }
        // console.log("minus");
      }
    }
    // console.log(count, scoreSum, scoreArr);
  }, [objectDetected]);

  return null;
};

export default RNBOSequencer;
