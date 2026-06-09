export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Prevent infinite loop
    if (request.headers.get('x-proxied') === 'true') {
      return fetch(request);
    }

    // ─── Paths that go to stretchworkstest.vercel.app ─────────────────────
    const vercelPaths = [
      '/forms',
      '/contact',
      '/test-page',
      // StretchWorks pages
      '/athletic',
      '/recovery-and-injury-support',
      '/50-60-stiffness-and-healthy-ageing',
      // AI chat API
      '/api/chat',
      // Public assets used by the stretch pages
      '/homeImage.png',
      '/firstVisit.jpg',
      '/Youtube.mp4',
      '/recovery.mp4',
      '/logo.png',
    ];

    const goesToVercel = vercelPaths.some(p =>
      path === p || path.startsWith(p + '/')
    );

    if (goesToVercel) {
      return fetch('https://stretchworkstest.vercel.app' + path + url.search, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      });
    }

    // ─── Next.js static assets — try Vercel first, fall back to main site ──
    // Both sites may have /_next/ paths. Vercel assets have unique chunk hashes
    // so the right one returns 200 and the wrong one returns 404.
    if (path.startsWith('/_next/')) {
      const vercelRes = await fetch(
        'https://stretchworkstest.vercel.app' + path + url.search,
        { method: 'GET', headers: request.headers }
      );
      if (vercelRes.status !== 404) {
        return vercelRes;
      }
      // 404 from Vercel → fall through to main site below
    }

    // ─── Everything else → chatwithresume.app ─────────────────────────────
    const newRequest = new Request(
      'https://chatwithresume.app' + path + url.search,
      {
        method: request.method,
        headers: { ...Object.fromEntries(request.headers), 'x-proxied': 'true' },
        body: request.body,
      }
    );
    return fetch(newRequest);
  },
};
