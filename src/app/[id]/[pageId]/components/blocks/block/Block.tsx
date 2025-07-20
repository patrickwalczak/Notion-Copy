import React, { createContext } from 'react';
import styles from './styles.module.scss';
import useIsOpenState from '@/lib/hooks/useIsOpenState';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';

interface BlockContextType {
	togglePopup: () => void;
	isPopupVisible: boolean;
	isBlockHovered: boolean;
}

export const BlockContext = createContext<BlockContextType | null>(null);

const Block = ({ children }: { children: React.ReactNode }) => {
	const { isOpen: isPopupVisible, toggle: togglePopup, close: closePopup } = useIsOpenState();
	const { isOpen: isBlockHovered, close: handleHoverLeave, open: handleHoverEnter } = useIsOpenState();

	const handleClickOutside = () => {
		closePopup();
		handleHoverLeave();
	};

	const ref = useOutsideClick(handleClickOutside, isPopupVisible);

	const handleMouseLeave = () => {
		if (isPopupVisible) return;
		handleHoverLeave();
	};

	const ctx = {
		togglePopup,
		isPopupVisible,
		isBlockHovered,
	};

	return (
		<BlockContext.Provider value={ctx}>
			<div ref={ref} className={styles.container} onMouseEnter={handleHoverEnter} onMouseLeave={handleMouseLeave}>
				{children}
			</div>
		</BlockContext.Provider>
	);
};

export default Block;
