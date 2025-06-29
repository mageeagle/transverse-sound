import { BUFFERMAP, channelMapObj } from "@/constants/buffers";
import { useSpots } from "@/hooks/useSpots";
import { useRef, useState } from "react";
import { useEffectOnce, useInterval, useUpdateEffect } from "react-use";
import * as Tone from "tone";

const AmbiPlayer = ({ id, loop }: { id: number, loop: boolean }) => {
  const player = useRef<Tone.Players | null>(null);

const [bufferLoaded, setBufferLoaded] = useState(false)

  // Load Buffer
  useInterval(
    () => {
      if (!player.current) return;
      console.log(player.current.loaded ? `buffers loaded ${id}` : `buffers loading ${id}`);
      if (player.current.loaded) {
        setBufferLoaded(true);
      }
    },
    bufferLoaded ? null : 500
  );

  // Load Buffer if ID !== 0, Clear Buffer if ID == 0
  useEffectOnce(() => {
    if (!id) return;
    console.log("loading buffers " + BUFFERMAP[id]);
    const urlMap = channelMapObj(BUFFERMAP[id], 9, "mp3");
    const players = new Tone.Players(urlMap).set({ fadeIn: 1, fadeOut: 1 }); // Loaded Callback does not work
    player.current = players;
    for (let i = 1; i <= 9; i++) {
      player.current.player(i.toString()).connect(useSpots.getState().ambisonicsInput!, 0, i - 1);
      player.current.player(i.toString()).volume.value = 9
      player.current.player(i.toString()).loop = loop

    }

    return () => {
      console.log(`buffer resetting ${id}`);
      players.stopAll();
      setTimeout(() => {
        players.dispose();
        player.current = null;
        console.log(`buffer resetted ${id}`);
      }, 1500);
    };
  });

  // Play Ambisonic Sound Files
  useUpdateEffect(() => {
    if (!bufferLoaded || !player.current) return;
    if (player.current.state === "started") return;
    console.log(`play ${id}`);
    for (let i = 1; player.current.has(i.toString()); i++) {
      console.log(`playback channel ${id} ${i}`)
      player.current.player(i.toString()).sync().start("+1");
    }
  }, [bufferLoaded]);
  return null;
};
export default AmbiPlayer;
