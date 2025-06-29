import { scale } from "@/helpers/mathsHelper";
import { useClassification } from "@/hooks/useClassification";
import { useEffectOnce } from "react-use";
import * as Tone from "tone";
// '/assets/audio/rift-samples/salt.ogg'
const RandomPlaybackPanner = ({ url, volume }: { url: string, volume: number }) => {
  useEffectOnce(() => {
    const buffer = new Tone.ToneAudioBuffer(url);
    let timeout;
    const playback = () => {
      const panner = new Tone.Panner(Math.random() * 2 - 1).toDestination();
      const player = new Tone.Player(buffer).connect(panner);
      // console.log(url + " " + player.loaded);
      player.playbackRate = useClassification.getState().playbackRate
      player.volume.value = volume;
      player.onstop = () => {
        panner.dispose();
        player.dispose();
      };
      const seed = Math.random();
      const seedDuration = Math.random();
      const playTime = scale(seedDuration, 0, 1, 1.5, 5);
      player.fadeIn = playTime / 3;
      player.fadeOut = playTime / 3;
      try {
        player.start("+0.1", scale(seed, 0, 1, 0, 40), playTime);
      } catch (error) {
        try {
          panner.dispose();
          player.dispose();
        } catch (error) {}
      }

      timeout = setTimeout(() => {
        if (buffer.disposed) return;
        playback();
      }, scale(Math.random(), 0, 1, 3000, 10000));
    };

    timeout = setTimeout(() => {
      playback();
    }, scale(Math.random(), 0, 1, 3000, 10000));

    return () => {
      buffer.dispose();
    };
  });

  return null;
};

export default RandomPlaybackPanner;
