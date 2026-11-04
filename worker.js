export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const pathname = new URL(request.url).pathname;

    if (pathname.endsWith(".yaml") || pathname.endsWith(".md")) {
      const headers = new Headers(response.headers);
      headers.set("Content-Type", "text/plain; charset=utf-8");

      return new Response(response.body, {
        status: response.status,
        headers,
      });
    }

    return response;
  },
};
