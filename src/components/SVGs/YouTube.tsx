import React from 'react';

const YouTube = ({ className = '' }: { className?: string }) => {
	return (
		<svg className={className} viewBox="0 0 18 18">
			<path d="M9 2.070c-8.845 0-9 0.787-9 6.93s0.155 6.93 9 6.93 9-0.787 9-6.93-0.155-6.93-9-6.93zM11.884 9.301l-4.041 1.886c-0.354 0.164-0.644-0.020-0.644-0.41v-3.553c0-0.39 0.29-0.574 0.644-0.41l4.041 1.886c0.354 0.166 0.354 0.436 0 0.601z"></path>
		</svg>
	);
};

export default YouTube;
