import React from 'react';

const Facebook = ({ className = '' }: { className?: string }) => {
	return (
		<svg className={className} viewBox="0 0 18 18">
			<path d="M17.999 8.999c0-4.97-4.029-8.999-8.999-8.999s-8.999 4.029-8.999 8.999c0 4.492 3.291 8.215 7.593 8.89v-6.289h-2.285v-2.601h2.285v-1.983c0-2.255 1.344-3.501 3.399-3.501 0.985 0 2.015 0.176 2.015 0.176v2.215h-1.135c-1.118 0-1.467 0.694-1.467 1.405v1.688h2.496l-0.399 2.601h-2.097v6.289c4.302-0.675 7.593-4.398 7.593-8.89z"></path>
		</svg>
	);
};

export default Facebook;
