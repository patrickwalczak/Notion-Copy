import React from 'react';

const Plus = ({ className = '' }: { className?: string }) => {
	return (
		<svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 16 16" className={className}>
			<path d="M8 2.3a.7.7 0 0 0-.7.7v4.3H3a.7.7 0 1 0 0 1.4h4.3V13a.7.7 0 1 0 1.4 0V8.7H13a.7.7 0 1 0 0-1.4H8.7V3a.7.7 0 0 0-.7-.7"></path>
		</svg>
	);
};

export default Plus;
