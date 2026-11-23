import type { NextConfig } from "next";
const config: NextConfig = { poweredByHeader: false, experimental:{agentUpgrade:"security"}, images:{remotePatterns:[{protocol:"https",hostname:"cdn.sanity.io",pathname:"/images/**"}]}, async redirects() { return [{ source: "/", destination: "/en", permanent: false }]; } };
export default config;
