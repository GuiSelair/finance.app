/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ['www.github.com'],
	},
	pageExtensions: ['page.tsx', 'page.ts'],
	compiler: {
		styledComponents: true,
	},
};

module.exports = nextConfig;
