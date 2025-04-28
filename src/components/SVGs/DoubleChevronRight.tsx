import React from 'react';

const DoubleChevronRight = ({ className = '' }: { className?: string }) => {
	return (
		<svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className={className}>
			<path d="M3.608 10.442a.625.625 0 0 1 0-.884l5.4-5.4a.625.625 0 0 1 .884.884L4.934 10l4.958 4.958a.625.625 0 1 1-.884.884z"></path>
			<path d="m14.508 4.158-5.4 5.4a.625.625 0 0 0 0 .884l5.4 5.4a.625.625 0 1 0 .884-.884L10.434 10l4.958-4.958a.625.625 0 1 0-.884-.884"></path>
		</svg>
	);
};

export default DoubleChevronRight;
