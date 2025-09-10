import React from 'react';
import './styles.scss';
import Plus from '@/components/SVGs/Plus';
import Dots from '@/components/SVGs/Dots';
import { mergeClasses } from '@/lib/utils/mergeClasses';
import { EditorElementShapes } from '@/types/elements';

const BlockActions = ({
	children,
	areActionsVisible,
	isPopupVisible,
	togglePopup,
	element,
}: {
	children: React.ReactNode;
	areActionsVisible: boolean;
	isPopupVisible: boolean;
	togglePopup: () => void;
	element: EditorElementShapes | undefined;
}) => {
	const isVisible = !!element && (areActionsVisible || isPopupVisible);

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		togglePopup();
	};

	return (
		<div className={mergeClasses('block__actions--container', isVisible && 'block__actions--container--visible')}>
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
