# Transverse / Sound Interactions

This is the source code for all the sound interactions in the interactive soundwalk "Transverse", a Next.js app with Ambisonics (Omnitone), Web Sensor API, Tone.js, RNBO, Mediapipe integration.
Learn more about the project at https://transverse-documentation.vercel.app

Location related sound interactions are removed and replaced by buttons and sliders for access without being in the soundwalk zone at Kwun Tong, Hong Kong.

There might be redundant code, as the code is extracted from the original soundwalk app.
Language change is hard coded instead of using a localization library, please ignore how the text display is implemented.

This app does not work with Firefox with various reasons mentioned below.

## General Structure

The soundwalk is written in TypeScript under the Next.js framework.
It is a single page app, as I haven't experimented with the mounting/unmounting of the WebAudio and Mediapipe components.

Various libraries are initiated while loading the page and placed in zustand stores, to be accessed everywhere in the app.

### Ambisonics
The ambisonics library [Omnitone](https://github.com/GoogleChrome/omnitone) is first initialized. A new AudioContext is made to initialize the High Order Ambisonics Binaural Renderer at 48KHz, and the AudioContext is placed into Tone.js AudioContext.
The ambisonics decoding can be turned on when needed and off to save resources.
Creating the AudioContext like this would make Firefox recognize AudioNodes for some reason.
Note that at the time of writing, Omnitone has a check function that checks the type of the AudioContext, only the native AudioContext, which blocks the use of [standardized-audio-context](https://github.com/chrisguttandin/standardized-audio-context/), causing incompatibilities if we are to use external libraries such as [Tone.js](https://github.com/Tonejs/Tone.js). 
Refer to /components/sound/AmbiPlayerOmni.tsx

### Sensors
The sensor values of the smartphone is then called through the Web Sensor API, and their values placed into a zustand store for access. 
Firefox does not support this.
The mapping of alpha, beta, gamma to Quaternion (which Omnitone only supports) is based on blind tests because I couldn't figure out how to transform Euler to Quaternion
The conventions of different libraries on Euler and Quaternion are all different
Refer to /hooks/useSensors.ts
If you change the mappings there, you can test the Ambisonics Orientation by going to https://localhost:3000/ambitest

### RNBO
The [RNBO](https://rnbo.cycling74.com/js) audio device is initialized after the audio context is ready. An Empty RNBO patch is started, and the device is placed into a zustand store for access.
At the time when the app was written, there is no way to dispose a RNBO process. 
If components with RNBO devices are unmounted, it would stay in the memory and continue to run, causing huge performance issues. Disconnecting all connected nodes does not solve this.
The only way to mount/dispose the RNBO device is to "Recycle" the device by calling createDevice in RNBO, putting the old device on the second argument. 
The old device will be replaced by the new patch and is technically "Disposed".
Hence the way of disposing a RNBO device after the corresponding component is unmounted, is to createDevice with an empty patch.
Refer to /components/sound/RNBOInit.tsx and files that start with RNBO

### Mediapipe
Files for Vision tasks of [Mediapipe](https://ai.google.dev/edge/mediapipe/solutions/guide) are first loaded with FilesetResolver when the app is loaded. It is then reused when a different algorithm is used.
The Mediapipe device is created when needed and disposed when not needed. 
Refer to /components/mediapipe

### General Flow of Mounting/Unmounting different Soundwalk Sections / Sound Instruments
Whenever an section/instrument is activated, the Mediapipe device is first loaded.
Afterwards, the RNBO sound device is loaded.
Finally, the Camera component is loaded.
Refer to /components/sections/

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [https://localhost:3000](https://localhost:3000) with your browser to see the result.

