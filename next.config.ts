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
	sassOptions: {
		sassOptions: {
			includePaths: [path.join(__dirname, 'styles')],
			prependData: `  
			@import "variables";
      		@import "mixins";`,
		},
	},
};

export default nextConfig;
