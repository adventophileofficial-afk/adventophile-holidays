import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder images are SVG; safe to allow since they are self-hosted,
    // not user-uploaded or remote. Revisit once real photography (JPEG/WebP) replaces them.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Local photos carry a `?v=<mtime>` cache-busting query (see lib/image-version.ts) so
    // re-imported photos at the same path aren't served stale from browser/optimizer cache.
    // `search` is omitted (vs. pinned to one value) because the version changes per file, per
    // import run — safe here since `/images/**` is our own self-hosted, non-user-controlled path.
    localPatterns: [{ pathname: "/images/**" }],
    // 85 is used only by the 4K homepage hero slides; everything else keeps the default 75.
    qualities: [75, 85],
  },
};

export default nextConfig;
