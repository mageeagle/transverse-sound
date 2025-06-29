import { useSensors } from "@/hooks/useSensors";
import { useSpots } from "@/hooks/useSpots";
import { useRef } from "react";
import {
  useEffectOnce,
  useInterval,
  useUpdateEffect,
} from "react-use";
import * as Tone from "tone";
import { useLoading } from "@/hooks/useBufferLoading";
// @ts-ignore
import { default as Omnitone } from "omnitone/build/omnitone.esm";
// import { AudioContext } from 'standardized-audio-context';

// Create new Audio Context with new sample rate because Omnitone does not recognize Tone.js context
// Ignore depreciated, it's for some reason the only way to add it anyways
// Can no longer use standardized-audio-context FOR NOW
//@ts-ignore
// window.AudioContext = AudioContext;
const norm = new AudioContext({ sampleRate: 48000, latencyHint : "playback" })
//@ts-ignore
// const context = new Tone.Context(norm)
Tone.setContext(norm, true);

// IMPORTANT this MAY cause issues on other components with Tone.js, as if they are in different audio contexts.
// Be sure to have other Tone.js objects created after decoderLoaded is true

// Hard Coded 2nd Order Player

export default function AmbiPlayerOmni() {
  const merge = useRef(new Tone.Merge(9));
  const decoder = useRef(Omnitone.createHOARenderer(Tone.getContext().rawContext, { ambisonicOrder: 2, renderingMode: "off" }));
  const gain = useRef(new Tone.Gain(1));
  
  useInterval(() => {
    if (decoderLoaded) {
      const matrix = useSensors.getState().matrix
      decoder.current.setRotationMatrix4(matrix)
    }
  }, 25);

  // Check decoder initialization
  const decoderLoaded = useLoading((s) => s.decoderLoaded);
  const decoderOn = useLoading((s) => s.decoderOn);

  useUpdateEffect(() => {
    console.log(decoderOn)
    if (!decoderOn) {
      decoder.current.setRenderingMode("off")
    }
    if (decoderOn) {
      decoder.current.setRenderingMode("ambisonic")
    }
  }, [decoderOn])

  useEffectOnce(() => {
    decoder.current.initialize().then(() => {
      Tone.connect(merge.current, decoder.current.input);
      Tone.connect(decoder.current.output, gain.current);
      gain.current.toDestination();
      useLoading.getState().setDecoderLoaded();
      useSpots.getState().setAmbisonicsInput(merge.current)
    });
  });

  return null;
}
