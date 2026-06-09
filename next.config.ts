import type { NextConfig } from "next";

// When the app is served through the Cloudflare Worker proxy on chatwithresume.app,
// asset requests (/_next/static/...) would otherwise hit the wrong origin.
// assetPrefix makes every asset URL absolute to the Vercel deployment, so the
// browser loads JS/CSS/fonts directly from Vercel and bypasses the Worker entirely.
const nextConfig: NextConfig = {
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://stretchworkstest.vercel.app"
      : undefined,
};

export default nextConfig;
