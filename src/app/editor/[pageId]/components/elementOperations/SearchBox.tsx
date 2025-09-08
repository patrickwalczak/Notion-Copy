import React from 'react';

const SearchBox = ({ onSearch }: { onSearch: (query: string) => void }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value);
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
				// aria-activedescendant=":r4l:"
				onClick={handleClick}
				onChange={handleInput}
			/>
		</div>
	);
};

export default SearchBox;
