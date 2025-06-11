import React from 'react';

const CarouselArrowRight = ({
	outerClassName,
	innerClassName,
}: {
	outerClassName?: string;
	innerClassName?: string;
}) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={outerClassName}>
			<svg className={innerClassName} viewBox="0 0 33 32">
				<rect width="31.2" height="31.2" x=".9" y=".4" rx="15.6" strokeWidth="1"></rect>
				<path d="m23.769 16-7.2 7.2-1.272-1.272 5.028-5.028H9.297v-1.8h11.028l-5.028-5.028L16.569 8.8l7.2 7.2Z"></path>
			</svg>
		</svg>
	);
};

export default CarouselArrowRight;
