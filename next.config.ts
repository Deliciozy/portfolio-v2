import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/projects/agent-studio",
          destination: "/original-projects/agent-studio.html",
        },
        {
          source: "/projects/automind-ai",
          destination: "/original-projects/automind-ai.html",
        },
        {
          source: "/projects/pathy-travel",
          destination: "/original-projects/pathy-travel.html",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
