// Custom Next.js server — adds Brotli on top of the default gzip.
//
// Why: Next's built-in `compress` only ever emits gzip, and the App Hosting edge
// (envoy) adds no compression of its own. A client advertising ONLY `br` was
// therefore served the page fully UNCOMPRESSED (252 KB instead of 40 KB).
// Brotli cuts the HTML another ~15–20% below gzip for every visitor and crawler.
//
// `compression@1.8+` negotiates br → gzip → deflate → identity from the request's
// Accept-Encoding, so gzip-only clients (and any bot that does not speak brotli)
// keep working exactly as before. Next still renders/streams normally — this only
// wraps the response body.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import next from "next";
import compression from "compression";

const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Brotli quality 5 ≈ gzip-6 CPU cost with meaningfully better ratio; quality 11
// would stall TTFB on dynamic HTML, which is exactly what we are protecting.
const compress = compression({
  threshold: 1024,
  brotli: {
    params: {
      [(await import("node:zlib")).constants.BROTLI_PARAM_QUALITY]: 5,
    },
  },
});

// ── Static text routes served directly so they actually get compressed ──
// Next pipes force-static Route Handler (Web Response) bodies straight to the
// socket, bypassing the patched res.write — so llms-full.txt was going out at
// 95 KB UNCOMPRESSED to every AI crawler (same on the previous gzip-only setup).
// These four are build-time constants, so we serve the prerendered body and let
// `compression` do its job. Any miss falls through to Next untouched.
const STATIC_TEXT = new Map([
  ["/llms.txt", ["llms.txt.body", "text/plain; charset=utf-8"]],
  ["/llms-full.txt", ["llms-full.txt.body", "text/plain; charset=utf-8"]],
  ["/sitemap.xml", ["sitemap.xml.body", "application/xml; charset=utf-8"]],
  ["/robots.txt", ["robots.txt.body", "text/plain; charset=utf-8"]],
]);
const APP_DIR = path.join(process.cwd(), ".next", "server", "app");
const textCache = new Map();

async function serveStaticText(pathname, res) {
  const entry = STATIC_TEXT.get(pathname);
  if (!entry) return false;
  const [file, type] = entry;
  try {
    let body = textCache.get(file);
    if (body === undefined) {
      body = await readFile(path.join(APP_DIR, file));
      textCache.set(file, body);
    }
    res.setHeader("Content-Type", type);
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.end(body);
    return true;
  } catch {
    return false; // not prerendered (e.g. dev) → let Next handle it
  }
}

await app.prepare();

createServer((req, res) => {
  // compression() is connect-style: run it, then hand off to Next.
  compress(req, res, async () => {
    const pathname = (req.url || "/").split("?")[0];
    if (await serveStaticText(pathname, res)) return;
    handle(req, res).catch((err) => {
      console.error("request failed:", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    });
  });
}).listen(port, hostname, () => {
  console.log(`▲ Next.js ready on http://${hostname}:${port} (brotli+gzip)`);
});
