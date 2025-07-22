import React from 'react';

const Trash = () => {
	return (
		<div>
			<button
				disabled
				className={`nav__add-page-btn nav-element flex-align-center gap-050 button-empty bg-transition bg-hover`}
			>
				<span className="block truncate flex-grow-1">Trash</span>
			</button>
		</div>
	);
};

export default Trash;
