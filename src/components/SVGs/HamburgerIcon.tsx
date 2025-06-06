import React from 'react';

const HamburgerIcon = ({ className = '' }: { className?: string }) => {
	return (
		<svg className={className} aria-hidden="true" role="graphics-symbol" viewBox="0 0 14 14">
			<path d="M0,1.25 L14,1.25 L14,2.75 L0,2.75 L0,1.25 Z M0,6.25 L14,6.25 L14,7.75 L0,7.75 L0,6.25 Z M0,11.25 L14,11.25 L14,12.75 L0,12.75 L0,11.25 Z"></path>
		</svg>
	);
};

export default HamburgerIcon;
