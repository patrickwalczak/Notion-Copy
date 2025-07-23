import React from 'react';

const SearchBox = () => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className="block-operations__search-box">
			<input
				placeholder="Search actions…"
				type="text"
				className="block-operations__input"
				role="combobox"
				aria-expanded="true"
				aria-haspopup="listbox"
				aria-controls="listbox"
				aria-activedescendant=":r4l:"
				onClick={handleClick}
			/>
		</div>
	);
};

export default SearchBox;
