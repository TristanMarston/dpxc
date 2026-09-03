/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['lucide-react'],
    // Next 16 auto-generates AGENTS.md / CLAUDE.md on `next dev`; opt out to keep the repo clean.
    agentRules: false,
};

export default nextConfig;
