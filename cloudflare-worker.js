// Cloudflare Worker — chatwithresume.app
// Routes /contact and /forms to existing Cloudflare Pages, everything else to Next.js

const EXISTING_PAGES_ORIGIN = "https://chatwithresume.pages.dev"; // replace with your Cloudflare Pages URL

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/contact" || path === "/forms") {
      // Proxy to existing Cloudflare Pages — URL in browser stays unchanged
      const targetUrl = `${EXISTING_PAGES_ORIGIN}${path}${url.search}`;
      const proxied = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: "follow",
      });
      return fetch(proxied);
    }

    // All other routes pass through normally (to your Next.js app)
    return fetch(request);
  },
};
