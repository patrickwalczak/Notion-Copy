import React from 'react';
import './styles.scss';
import Plus from '@/components/SVGs/Plus';
import Dots from '@/components/SVGs/Dots';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { BlockContext } from '../blocks/block/Block';

const BlockActions = ({ children }: { children: React.ReactNode }) => {
	const { isBlockHovered, isPopupVisible, togglePopup } = useSafeContext(BlockContext);

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		togglePopup();
	};

	return (
		<div className={`block__actions--container ${isBlockHovered ? 'block__actions--container--visible' : ''}`}>
			<button className={`block__actions--button primaryButton`}>
				<Dots className="flex-grow-0" />
			</button>
			<button title="Click to open menu" onClick={toggleMenu} className={`block__actions--button primaryButton`}>
				<Plus className="plus-svg flex-grow-0" />
			</button>

			{isPopupVisible && children}
		</div>
	);
};

export default BlockActions;
