/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['www.github.com'],
	},
	pageExtensions: ['page.tsx', 'page.ts'],
};

module.exports = nextConfig;
