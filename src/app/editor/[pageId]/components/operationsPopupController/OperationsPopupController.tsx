import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import BlockActions from '../blockActions/BlockActions';
import useIsOpenState from '@/lib/hooks/useIsOpenState';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { PageContext } from '../pageClient/PageClient';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/app/editor/providers/pagesProvider/PagesProvider';
import { ElementOperationsPopup } from '../elementOperations/ElementOperationsPopup';

const PADDING_TOP = 3;

const OperartionsPopupController = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);
	const [top, setTop] = useState(PADDING_TOP);
	const { isOpen: isPopupVisible, toggle: togglePopup, close: closePopup } = useIsOpenState();
	const { isOpen: areActionsVisible, close: hideActions, open: showActions } = useIsOpenState();

	const closeAll = useCallback(() => {
		closePopup();
		hideActions();
	}, [closePopup, hideActions]);

	const ref = useOutsideClick(closeAll, isPopupVisible);
	const { blocks } = useSafeContext(PageContext);
	const blockId = useRef<string | null>(null);
	const element = page?.elements.find((el) => el.id === blockId.current);

	const setTopHelper = (targetTop: number, containerTop: number) =>
		setTop(Math.floor(Math.abs(targetTop - containerTop)) + PADDING_TOP);

	useEffect(() => {
		const handleMousemove = (e: MouseEvent) => {
			if (isPopupVisible) return;

			// Don't show popup if there is only one block, it means that only a page name is present
			if (blocks.current?.size === 1) {
				closeAll();
				blockId.current = null;
				return;
			}

			// Don't show popup if mouse is outside of the container
			if (!containerRef.current?.contains(e.target as Node)) {
				closeAll();
				blockId.current = null;
				return;
			}

			const target = e.target as HTMLElement;
			const hasBlockId = target.hasAttribute('data-block-id');
			const hasSharedPopup = target.hasAttribute('data-shared-popup') || target.closest('[data-shared-popup]');

			if (!target || (!hasBlockId && !hasSharedPopup)) {
				hideActions();
				blockId.current = null;
				return;
			}

			const containerRect = containerRef.current.getBoundingClientRect();

			if (hasBlockId) {
				const targetRect = target.getBoundingClientRect();

				blockId.current = target.getAttribute('data-block-id');

				setTopHelper(targetRect.top, containerRect.top);
				showActions();
			}

			if (hasSharedPopup) {
				const point = e.clientY;

				if (!blocks.current) return;

				const blocksArr = Array.from(blocks.current.values());

				blocksArr.forEach((block) => {
					const blockRect = block.element.getBoundingClientRect();

					if (blockRect.top <= point && blockRect.bottom >= point) {
						blockId.current = block.id;
						showActions();

						setTopHelper(blockRect.top, containerRect.top);
					}
				});
			}
		};

		document.addEventListener('mousemove', handleMousemove);

		return () => {
			document.removeEventListener('mousemove', handleMousemove);
		};
	}, [top, isPopupVisible, areActionsVisible, hideActions, showActions, containerRef, blocks, closeAll]);

	const resetPopupPosition = () => {
		setTop(PADDING_TOP);
	};

	return (
		<div data-shared-popup="true" className={styles.sidebar}>
			<div ref={ref} className={styles.container} style={{ top: `${top}px` }}>
				<BlockActions areActionsVisible={areActionsVisible} isPopupVisible={isPopupVisible} togglePopup={togglePopup}>
					<ElementOperationsPopup
						element={element}
						elementType={element?.type}
						closePopup={closePopup}
						resetPopupPosition={resetPopupPosition}
					/>
				</BlockActions>
			</div>
		</div>
	);
};

export default OperartionsPopupController;
