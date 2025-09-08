import React from 'react';
import './styles.scss';
import Plus from '@/components/SVGs/Plus';
import Dots from '@/components/SVGs/Dots';

const BlockActions = ({
	children,
	areActionsVisible,
	isPopupVisible,
	togglePopup,
}: {
	children: React.ReactNode;
	areActionsVisible: boolean;
	isPopupVisible: boolean;
	togglePopup: () => void;
}) => {
	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		togglePopup();
	};

	return (
		<div
			className={`block__actions--container ${
				areActionsVisible || isPopupVisible ? 'block__actions--container--visible' : ''
			}`}
		>
			<button
				onClick={toggleMenu}
				className={`block__actions--button primaryButton`}
				title="Click to open menu"
				aria-label="Open menu"
			>
				<Dots className="flex-grow-0" />
			</button>
			<button className={`block__actions--button primaryButton`}>
				<Plus className="plus-svg flex-grow-0" />
			</button>

			{isPopupVisible && children}
		</div>
	);
};

export default BlockActions;
