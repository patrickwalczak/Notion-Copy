import React from 'react';

const CaretDown = ({ className }: { className?: string }) => {
	return (
		<svg viewBox="0 0 8 6" className={className}>
			<path d="m1 1 3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
		</svg>
	);
};

export default CaretDown;
