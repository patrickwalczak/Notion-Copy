import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
	experimental: {
		dynamicIO: true,
	},
	sassOptions: {
		additionalData: `$tablet: 768px; $laptop: 1024px; $desktop: 1280px;`,
	},
};

export default nextConfig;
