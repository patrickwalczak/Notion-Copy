import React from 'react';

const Operation = ({ label, handleAction }: { label: string; handleAction: () => void }) => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleAction();
	};

	return (
		<li>
			<button onClick={handleClick} className="block-operations__button flex align-center button-empty">
				{label}
			</button>
		</li>
	);
};

export default Operation;
