'use client';

import React from 'react';
import Plus from '../SVGs/Plus';

const AddNewPage = ({
	label = null,
	buttonClass,
	svgClass,
}: {
	label?: string | null;
	buttonClass: string;
	svgClass: string;
}) => {
	return (
		<button className={buttonClass} aria-label="Add new page">
			<Plus className={svgClass} />
			{label && <span>{label}</span>}
		</button>
	);
};

export default AddNewPage;
