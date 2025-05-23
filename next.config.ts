import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: '*.js',
				},
			},
		},
	},
	eslint: {
		ignoreDuringBuilds: false,
	},
};

export default nextConfig;
