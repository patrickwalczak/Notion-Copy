import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import BlockActions from '../blockActions/BlockActions';
import BlockOperationsPopup from '../blockOperations/BlockOperationsPopup';
import useIsOpenState from '@/lib/hooks/useIsOpenState';
import { useOutsideClick } from '@/lib/hooks/useOutsideClick';
import { PageContext } from '../pageClient/PageClient';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

const PADDING_TOP = 3;

const SharedPopup = ({ block, containerRef }: { block: any; containerRef: React.RefObject<HTMLDivElement | null> }) => {
	const [top, setTop] = useState(PADDING_TOP);
	const { isOpen: isPopupVisible, toggle: togglePopup, close: closePopup } = useIsOpenState();
	const { isOpen: areActionsVisible, close: hideActions, open: showActions } = useIsOpenState();
	const ref = useOutsideClick(closeAll, isPopupVisible);
	const { blocks } = useSafeContext(PageContext);

	const setTopHelper = (targetTop: number, containerTop: number) =>
		setTop(Math.floor(Math.abs(targetTop - containerTop)) + PADDING_TOP);

	useEffect(() => {
		const handleMousemove = (e: MouseEvent) => {
			if (isPopupVisible) return;

			if (blocks.current?.size === 1) {
				closeAll();
				return;
			}

			if (!containerRef.current?.contains(e.target as Node)) {
				closeAll();
				return;
			}

			const target = e.target as HTMLElement;
			const hasBlockId = target.hasAttribute('data-block-id');
			const hasSharedPopup = target.hasAttribute('data-shared-popup');

			if (!target || (!hasBlockId && !hasSharedPopup)) {
				hideActions();
				return;
			}

			const containerRect = containerRef.current.getBoundingClientRect();

			if (hasBlockId) {
				const targetRect = target.getBoundingClientRect();

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
						showActions();

						setTopHelper(blockRect.top, containerRect.top);

						return;
					}

					closeAll();
				});
			}
		};

		document.addEventListener('mousemove', handleMousemove);

		return () => {
			document.removeEventListener('mousemove', handleMousemove);
		};
	}, [top, isPopupVisible, areActionsVisible]);

	function closeAll() {
		closePopup();
		hideActions();
	}

	return (
		<div data-shared-popup="true" className={styles.sidebar}>
			<div ref={ref} className={styles.container} style={{ top: `${top}px` }}>
				<BlockActions areActionsVisible={areActionsVisible} isPopupVisible={isPopupVisible} togglePopup={togglePopup}>
					<BlockOperationsPopup block={block} />
				</BlockActions>
			</div>
		</div>
	);
};

export default SharedPopup;
