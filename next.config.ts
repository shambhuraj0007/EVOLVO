import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 eslint: {
   ignoreDuringBuilds: true, // Only run ESLint on the 'pages' and 'components' directories during production builds (next build)
 },
 typescript: {
   ignoreBuildErrors: true, // Disable type checking during production builds (next build)
 },
};

export default nextConfig;
