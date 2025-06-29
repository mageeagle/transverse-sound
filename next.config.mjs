/** @type {import('next').NextConfig} */

import withSerwistInit from "@serwist/next";
const nextConfig = {
  reactStrictMode: false
}
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
});

export default withSerwist(nextConfig);
