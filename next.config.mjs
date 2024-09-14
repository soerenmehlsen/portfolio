/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
    output: 'export'
};

export default nextConfig;
