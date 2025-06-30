// @ts-nocheck
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { quat2ypr } from "@/helpers/mathsHelper";
import Quaternion from "quaternion";

// Initial Values // Names to Access
const user = {
  magnetometer: {
    x: 0,
    y: 0,
    z: 0,
  },
  light: 0,
  orientation: {
    y: 0,
    p: 0,
    r: 0,
  },
  matrix: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

// Here to enable sensors
const settings = {
  magnetometer: false,
  light: false,
  orientation: true,
  frequency: 10,
};

// On9
type Matrix4 = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

// Set type for store / Only for typescript
type SensorsState = {
  // All in One State Changer
  setMag: (obj: { x: number; y: number; z: number }) => void;
  setLight: (lux: number) => void;
  setOrientation: (obj: { y: number; p: number; r: number }) => void;
  setMatrix: (obj: Matrix4) => void;
};

// Create the hook, with set functions
export const useSensors = create<SensorsState & typeof user>()(
  immer((set) => ({
    ...user,
    setMag: (obj) => set(() => ({ magnetometer: obj })),
    setLight: (lux) => set(() => ({ light: lux })),
    setOrientation: (obj) => set(() => ({ orientation: obj })),
    setMatrix: (obj) => set(() => ({ matrix: obj })),
  }))
);

// Prevent type bugs from window
declare global {
  interface Window {
    Magnetometer?: any;
    AmbientLightSensor?: any;
    AbsoluteOrientationSensor?: any;
  }
}

export const initiateSensors = () => {
  // Prevent Server-side error
  if (typeof window !== "undefined") {
    let mag: Magnetometer;
    let light: AmbientLightSensor;
    let ori: AbsoluteOrientationSensor;
    // Magnetometer Sensor
    if (settings.magnetometer && window.Magnetometer) {
      mag = new Magnetometer({ frequency: settings.frequency });
      mag.onreading = () => {
        useSensors.getState().setMag({
          x: mag.x ? mag.x : 0,
          y: mag.y ? mag.y : 0,
          z: mag.z ? mag.z : 0,
        });
      };

      mag.onerror = (event) => {
        console.log(event.error.name, event.error.message);
      };
      mag.start();
      console.log("Magnet");
    }
    // Light Sensor
    if (settings.light && window.AmbientLightSensor) {
      light = new AmbientLightSensor({ frequency: settings.frequency });
      light.onreading = () => {
        const lux = light.illuminance ? light.illuminance : 0;
        useSensors.getState().setLight(lux);
      };

      light.onerror = (event) => {
        console.log(event.error.name, event.error.message);
      };
      light.start();
      console.log("Light");
    }

    const deg = Math.PI / 180;
    function handleOrientation(event: DeviceOrientationEvent) {
      const absolute = event.absolute;
      const alpha = event.webkitCompassHeading * -1;
      const beta = event.beta!;
      const gamma = event.gamma!;

      useSensors.getState().setOrientation({
        y: alpha,
        p: beta,
        r: gamma,
      });
      useSensors
        .getState()
        .setMatrix(
          Quaternion.fromEulerLogical(
            (-alpha + 180) * deg,
            beta * deg,
            gamma * deg,
            "ZXY"
          ).toMatrix4(false)
        );
    }
    function handleOrientationAbs(event: DeviceOrientationEvent) {
      const absolute = event.absolute;
      const alpha = event.alpha!;
      const beta = event.beta!;
      const gamma = event.gamma!;

      useSensors.getState().setOrientation({
        y: alpha,
        p: beta,
        r: gamma,
      });
      // The mapping of alpha, beta, gamma here is based on blind tests because I couldn't figure out how to transform Euler to Quaternion
      // The conventions of different libraries on Euler and Quaternion are all different
      // You can test the Orientation by going to https://localhost:3000/ambitest
      useSensors
        .getState()
        .setMatrix(
          Quaternion.fromEulerLogical(
            (-alpha + 180) * deg,
            beta * deg,
            gamma * deg,
            "ZXY"
          ).toMatrix4(false)
        );
    }
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response == "granted") {
            window.addEventListener(
              "deviceorientation",
              handleOrientation,
              true
            );
            console.log("ios orientation granted");
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientationAbs,
        true
      );
    }
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      DeviceMotionEvent.requestPermission().then((response) => {
        console.log("ios motion granted");
      });
    }
  }
};
