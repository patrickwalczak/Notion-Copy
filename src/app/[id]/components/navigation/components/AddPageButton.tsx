import React from 'react';
import Plus from '@/components/SVGs/Plus';

const AddPageButton = () => {
	return (
		<button className={`nav__add-page-btn nav-element flex-align-center gap-050 button-empty bg-transition bg-hover`}>
			<Plus className="plus-svg flex-grow-0" />
			<span className="block truncate flex-grow-1">Add new</span>
		</button>
	);
};

export default AddPageButton;
