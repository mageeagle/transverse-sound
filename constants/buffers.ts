export const channelSpreader = (
  name: string,
  channels: number,
  format: string
) => {
  const out = [];
  for (let i = 1; i <= channels; i++) {
    out.push(
      `/assets/audio/${name}/${name}-${
        i >= 100 ? i : i >= 10 ? "0" + i : "00" + i
      }.${format}`
    );
  }
  return out;
};
export const channelMapObj = (
  name: string,
  channels: number,
  format: string
) => {
  const out = {} as { [index: number]: string };
  for (let i = 1; i <= channels; i++) {
    out[i] = `/assets/audio/${name}/${name}-${
      i >= 100 ? i : i >= 10 ? "0" + i : "00" + i
    }.${format}`;
  }
  return out;
};

type BufferMapType = {
  [key: number]: string;
};
// Key map for buffers in the states
export const BUFFERMAP: BufferMapType = {
  1: "timerift-1",
  3: "timerift-2",
  5: "timerift-3",
  7: "timerift-4",
  2: "rift-1",
  4: "rift-2",
  6: "rift-3",
  10: "front"
};
