export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Prevent infinite loop
    if (request.headers.get('x-proxied') === 'true') {
      return fetch(request);
    }

    const VERCEL = 'https://stretchworkstest.vercel.app';

    // ── Stretch page routes ────────────────────────────────────────────────
    const stretchPages = [
      '/athletic',
      '/recovery-and-injury-support',
      '/50-60-stiffness-and-healthy-ageing',
      '/forms',
      '/contact',
    ];

    const isStretchPage = stretchPages.some(p =>
      path === p || path.startsWith(p + '/')
    );

    if (isStretchPage) {
      return fetch(VERCEL + path + url.search, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD'
          ? request.body
          : undefined,
      });
    }

    // ── API route for the chat widget ──────────────────────────────────────
    if (path.startsWith('/api/chat')) {
      return fetch(VERCEL + path + url.search, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }

    // ── Next.js assets — only proxy to Vercel if Referer is a stretch page ─
    // This prevents breaking the main chatwithresume.app assets.
    if (path.startsWith('/_next/')) {
      const referer = request.headers.get('referer') || '';
      const isStretchReferer = stretchPages.some(p => referer.includes(p));

      if (isStretchReferer) {
        return fetch(VERCEL + path + url.search, {
          method: 'GET',
          headers: request.headers,
        });
      }
      // Not from a stretch page → fall through to main site
    }

    // Note: public media (images/videos) are referenced with absolute Vercel
    // URLs in the app, so they go straight to Vercel and never reach this worker.
    // No /public asset proxying is needed here.

    // ── Everything else → main chatwithresume.app ──────────────────────────
    const newRequest = new Request(
      'https://chatwithresume.app' + path + url.search,
      {
        method: request.method,
        headers: { ...Object.fromEntries(request.headers), 'x-proxied': 'true' },
        body: request.method !== 'GET' && request.method !== 'HEAD'
          ? request.body
          : undefined,
      }
    );
    return fetch(newRequest);
  },
};
