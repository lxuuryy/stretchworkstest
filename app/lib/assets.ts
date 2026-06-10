// Public media (videos + /public images) are served straight from the Vercel
// origin so the requests bypass the Cloudflare Worker entirely. Routing them
// through stretchworks.com.au would make them depend on the Worker's Referer
// check, which can fail when a browser strips the Referer header.
//
// In development ASSET_BASE is empty, so paths stay local ("/homeImage.png").
// In production they become absolute ("https://stretchworkstest.vercel.app/...").
// Keep this URL in sync with `assetPrefix` in next.config.ts and `VERCEL` in
// cloudflare-worker.js.
export const ASSET_BASE =
  process.env.NODE_ENV === "production"
    ? "https://stretchworkstest.vercel.app"
    : "";

export const asset = (path: string) => `${ASSET_BASE}${path}`;
