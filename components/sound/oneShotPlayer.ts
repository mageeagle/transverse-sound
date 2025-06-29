import * as Tone from "tone";
import { RecursivePartial } from "tone/build/esm/core/util/Interface";
const oneShotPlayer = (
  url: string,
  options?: RecursivePartial<Tone.PlayerOptions>,
  destination?: Tone.InputNode,
  onstop?: () => void
) => {
  const player = new Tone.Player(url);
  player.autostart = true;
  player.volume.value = -6
  player.onstop = () => {
    onstop!()
    player.dispose();
  };
  if (options) player.set(options);
  if (destination) player.connect(destination);
  if (!destination) player.toDestination();
  return player
};

export default oneShotPlayer;
