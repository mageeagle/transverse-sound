import { useEffectOnce } from "react-use";

const WakeLockToggle = () => {
  useEffectOnce(() => {
    // Create a reference for the Wake Lock.
    let wakeLock: any = null;
    console.log("wake locking")
    // create an async function to request a wake lock
    try {
      navigator.wakeLock.request("screen").then((w) => {
        console.log("Wake Lock is active!");
        wakeLock = w
      });
    } catch (err: any) {
      // The Wake Lock request has failed - usually system related, such as battery.
      console.log(`${err.name}, ${err.message}`);
    }
    return () => {
      wakeLock?.release().then(() => {
        wakeLock = null;
      });
    };
  });
  return null;
};
export default WakeLockToggle;
