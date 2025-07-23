'use client';

import React from 'react';
import { PageName } from '../pageName/PageName';
import { Cover } from '../cover/Cover';
import styles from './styles.module.scss';
import PageContent from '../pageContent/PageContent';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { PageContext } from '../pageClient/PageClient';
import { handleFocus } from '../../utils';

const PageEditor = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);
	const { blocks, focusPreviousBlock, focusNextBlock, createDefaultBlock, focusedBlock } = useSafeContext(PageContext);

	const handleClick = async () => {
		if (!page || !blocks.current) return;

		const elements = page.elements;

		// Case 1: no elements at all
		if (elements.length === 0) {
			await createDefaultBlock({ pageId: page.id });
			return;
		}

		const lastElement = elements.at(-1);
		if (!lastElement) return;

		// Get its DOM ref
		const ref = blocks.current.get(lastElement.id);

		// Case 2: last element is not focusable
		if (!lastElement.isFocusable || !ref) {
			await createDefaultBlock({
				pageId: page.id,
				prevBlockId: lastElement.id,
			});
			return;
		}

		// Case 3: last element is focusable
		const textContent = ref.element.innerText.trim();

		if (textContent === '') {
			// Focus the empty last block
			handleFocus(ref.element);
		} else {
			// Create a new block after it
			await createDefaultBlock({
				pageId: page.id,
				prevBlockId: lastElement.id,
			});
		}
	};

	const handleEnter = async () => {
		if (!blocks.current || !page || !focusedBlock.current) return;

		const current = focusedBlock.current;

		const { elements } = page;

		if (current.type === 'pageName') {
			const firstBlock = elements[0];

			await createDefaultBlock({
				pageId: page.id,
				nextBlockId: firstBlock?.id,
			});
			return;
		}

		const currentIndex = elements.findIndex((el) => el.id === current.id);

		if (currentIndex === -1) {
			console.warn('Focused block not found in page.elements');
			return;
		}

		const nextBlock = elements[currentIndex + 1];

		await createDefaultBlock({
			pageId: page.id,
			prevBlockId: current.id,
			nextBlockId: nextBlock?.id,
		});
	};

	const handleKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
		if (!page) return;

		if (event.key === 'Enter') return handleEnter();

		if (event.key === 'ArrowUp') return focusPreviousBlock();

		if (event.key === 'ArrowDown') return focusNextBlock();
	};

	return (
		<main onKeyDown={handleKeyDown} onClick={handleClick} className={styles.mainContent}>
			<div className={`${styles.contentColumn} flex-column gap-050`}>
				<Cover />
				<div>
					{page ? (
						<PageName name={page?.properties?.name} id={page?.id} />
					) : (
						<div className={`${styles.loader} shimmerLoader`}></div>
					)}
				</div>
				<PageContent />
			</div>
		</main>
	);
};

export default PageEditor;
