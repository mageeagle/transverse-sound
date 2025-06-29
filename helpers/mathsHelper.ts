import { Frequency } from "tone";

export function expoentialMap(val: number, e: number, scale: number) {
  return Math.pow(val, e) * scale;
}

export function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}

export function deg2rad(num: number) {
  return num * (Math.PI / 180);
}

export function rad2deg(num: number) {
  return num / (Math.PI / 180);
}

export function aed2xyz([a, e, d]: [a: number, e: number, d: number]) {
  // SPAT AED Format
  const er = deg2rad(e);
  const ar = deg2rad(a);
  const x = d * Math.cos(er) * Math.sin(ar);
  const y = d * Math.cos(er) * Math.cos(ar);
  const z = d * Math.sin(er);
  return [x, y, z];
}

export function xyz2aed([x, y, z]: [x: number, y: number, z: number]) {
  // SPAT AED Format
  const d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
  const a = 90 - rad2deg(Math.atan2(y, x));
  const e = rad2deg(Math.atan2(z, Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))));
  return [a, e, d];
}

export function quat2ypr([x, y, z, w]: [
  x: number,
  y: number,
  z: number,
  w: number
]) {
  // Convention
  // Rotation about the x axis = roll angle = α
  // Rotation about the y-axis = pitch angle = β
  // Rotation about the z-axis = yaw angle = γ
  const t0 = 2 * (w * x + y * z);
  const t1 = 1 - 2 * (x * x + y * y);
  const pitch = Math.atan2(t0, t1);

  let t2 = 2 * (w * y - z * x);
  t2 = t2 > 1 ? 1 : t2;
  t2 = t2 < -1 ? -1 : t2;
  const roll = Math.asin(t2);

  const t3 = 2 * (w * z + x * y);
  const t4 = 1 - 2 * (y * y + z * z);
  const yaw = Math.atan2(t3, t4); // not sure

  return [yaw, pitch, roll];
}

export function randInt(min: number, max: number) {
  min = Math.ceil(min); // upper int
  max = Math.floor(max); // lower int
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function randFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function normRand(int: number) {
  let tempSum = 0;
  const outRatio = [];
  const out = [];
  for (let i = 0; i < int; i++) {
    const ratio = Math.random();
    tempSum += ratio;
    outRatio.push(ratio);
  }
  outRatio.forEach((f) => {
    out.push(f / tempSum);
  });
}

// Clamper
export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

// + / - with adjust
export const splitRandFloat = (num: number) =>
  randFloat(-(num / 2 - 1), num / 2 - 1);

export const scale = (
  num: number,
  min: number,
  max: number,
  dMin: number,
  dMax: number
) => {
  const source = max - min;
  const dest = dMax - dMin;
  return ((num - min) / source) * dest + dMin;
};

export const scaleClamp = (
  num: number,
  min: number,
  max: number,
  dMin: number,
  dMax: number
) => {
  return clamp(scale(num, min, max, dMin, dMax), dMin, dMax);
};
// x is the value you want to map
// a = linear minimum
// b = linear maximum
// c = exponential min
// d = expositional max

export function linexp(x: number, a: number, b: number, c: number, d: number) {
  if (x <= a) {
    return c;
  }
  if (x >= b) {
    return d;
  }
  return Math.pow(d / c, (x - a) / (b - a)) * c;
}

export const mtof = (m: number) => {
  return Frequency(m, "midi").toFrequency();
};

export const ftom = (f: number) => {
  return Frequency(f).toMidi();
};

export function ncdf(x: number, mean: number, std: number) {
  x = (x - mean) / std;
  const t = 1 / (1 + 0.2315419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  let prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (x > 0) {
    prob = 1 - prob;
  }
  return prob;
}
// const overworked = COUNTRYDATA[49].overworked
// const mean = COUNTRYDATA[49].hours
// const percentage = 1 - (overworked / 100)

export function findSTD(x: number, percentage: number, mean: number, sf = 3) {
  if ((x < mean && percentage > 0.5) || (x > mean && percentage < 0.5))
    return null;
  let std = 0;
  let step = 5;
  if (x > mean) {
    let check = 1;
    while (percentage < check) {
      std += step;
      const cdf = ncdf(x, mean, std);
      if (percentage > cdf) {
        std -= step;
        step /= 2;
      } else {
        check = cdf;
      }

      if (Number(percentage.toFixed(sf)) === Number(check.toFixed(sf)))
        return std;
    }
  } else {
    let check = 0.5;
    while (percentage < check) {
      std += step;
      const cdf = ncdf(x, mean, std);
      if (percentage < cdf) {
        std -= step;
        step /= 2;
      } else {
        check = cdf;
      }

      if (Number(percentage.toFixed(sf)) === Number(check.toFixed(sf)))
        return std;
    }
  }
}
