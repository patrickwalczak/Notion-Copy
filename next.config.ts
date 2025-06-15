import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
	experimental: {
		dynamicIO: true,
		useCache: true,
	},
	sassOptions: {
		additionalData: `$tablet: 768px; $laptop: 1024px; $desktop: 1280px;`,
	},
};

export default nextConfig;
