import React from 'react';

const BlockOperation = ({ label, handleAction }: { label: string; handleAction: () => Promise<void> }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleAction();
	};

	return (
		<li className="block-operations__option" role="option">
			<button onClick={handleClick} className="block-operations__button">
				{label}
			</button>
		</li>
	);
};

export default BlockOperation;
