/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingIncludes: {
    "/*": ["./content/**/*.mdx"],
  },
};

export default nextConfig;
