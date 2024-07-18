import path from 'path';
import withPurgeCSSModules from 'next-purge-css-modules';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {};

/** @type {import('next-purge-css-modules').PurgeConfig} */
const purgeConfig = {
    content: path.join(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
    enableDevPurge: true,
    fontFace: true,
    safelist: ['body', 'html'],
};

export default withPurgeCSSModules(purgeConfig, nextConfig);
