// @ts-nocheck
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { quat2ypr } from "@/helpers/mathsHelper";
import Quaternion from "quaternion";

// TODO: Close the sensors that are not used.

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

    // Relative Orientation, Resets every time
    // window.addEventListener("deviceorientation", function (event) {
    //   console.log(event.alpha + " : " + event.beta + " : " + event.gamma);
    //   useSensors.getState().setOrientation({
    //     y: event.alpha ? event.alpha : 0,
    //     p: event.beta ? event.beta : 0,
    //     r: event.gamma ? event.gamma : 0,
    //   });
    // });
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
    // +++ X
    // ++- X
    // +-- X 
    // +-+ X
    // -+- X
    // -++ ????
    // --+ X
    // --- X
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
      // window.addEventListener("deviceorientation", handleOrientation, true);
      // Absolute Orientation
      // if (settings.orientation && window.AbsoluteOrientationSensor) {
      //   Promise.all([
      //     navigator.permissions.query({
      //       name: "accelerometer" as PermissionName,
      //     }),
      //     navigator.permissions.query({
      //       name: "magnetometer" as PermissionName,
      //     }),
      //     navigator.permissions.query({ name: "gyroscope" as PermissionName }),
      //   ]).then((results) => {
      //     if (results.every((result) => result.state === "granted")) {
      //       try {
      //         ori = new AbsoluteOrientationSensor({
      //           frequency: settings.frequency,
      //         });
      //         ori.addEventListener("error", (event) => {
      //           // Handle runtime errors.
      //           if (event.error.name === "NotAllowedError") {
      //             console.log("Not Allowed");
      //           } else if (event.error.name === "NotReadableError") {
      //             console.log("Cannot connect to the sensor.");
      //           }
      //         });
      //         console.log("absolute android sensor")
      //         ori.onreading = () => {
      //           const q = ori.quaternion;
      //           if (!q) return;
      //           const ypr = quat2ypr([q[0], q[1], q[2], q[3]]);
      //           useSensors.getState().setOrientation({
      //             y: (ypr[0] / Math.PI) * 180,
      //             p: (ypr[1] / Math.PI) * 180,
      //             r: (ypr[2] / Math.PI) * 180,
      //           });
      //           useSensors
      //             .getState()
      //             .setMatrix(
      //               // new Quaternion(q[0], q[1], q[2], q[3]).toMatrix4(false)
      //               Quaternion.fromEulerLogical(
      //                 ypr[0],
      //                 ypr[1],
      //                 -ypr[2],
      //                 "ZXY"
      //               ).toMatrix4(false)
      //             );
      //         };

      //         ori.onerror = (event) => {
      //           console.log(event.error.name, event.error.message);
      //           useSensors.getState().setOrientation({
      //             y: 111,
      //             p: 0,
      //             r: 0,
      //           });
      //         };

      //         ori.start();
      //       } catch (error: any) {
      //         // Handle construction errors.
      //         if (error.name === "SecurityError") {
      //           // See the note above about permissions policy.
      //           console.log(
      //             "Sensor construction was blocked by a permissions policy."
      //           );
      //           useSensors.getState().setOrientation({
      //             y: 999,
      //             p: 0,
      //             r: 0,
      //           });
      //         } else if (error.name === "ReferenceError") {
      //           console.log("Sensor is not supported by the User Agent.");
      //           useSensors.getState().setOrientation({
      //             y: 555,
      //             p: 0,
      //             r: 0,
      //           });
      //         } else {
      //           throw error;
      //         }
      //       }
      //       // …
      //     } else {
      //       console.log("No permissions to use AbsoluteOrientationSensor.");
      //     }
      //   });
      // }
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
    // Do stuff with the new orientation data
  }
};
