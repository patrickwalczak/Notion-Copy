'use client';

import React from 'react';
import { PageName } from '../pageName/PageName';
import { Cover } from '../cover/Cover';
import styles from './styles.module.scss';
import PageContent from '../pageContent/PageContent';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { PageContext } from '../pageClient/PageClient';

const PageEditor = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);
	const { focusableBlocks, focusedBlock, focusPreviousBlock, focusNextBlock, createDefaultBlock } =
		useSafeContext(PageContext);

	const handleClick = async () => {
		if (!focusableBlocks.current || !page) return;

		const elementsArr = Array.from(focusableBlocks.current.values() || []);

		if (elementsArr.length === 0 || (elementsArr.length === 1 && elementsArr[0]?.type === 'pageName')) {
			await createDefaultBlock(page.id, page.elements.length + 1);
			return;
		}

		const lastElement = elementsArr.at(-1);

		if (!lastElement) return;

		const isEmpty = lastElement.element.innerText.trim().length === 0;

		// TODO handle other text elements
		if (lastElement.type === 'text' && isEmpty) return lastElement.element.focus();

		await createDefaultBlock(page.id, page.elements.length + 1);
	};

	const handleKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
		if (!page) return;

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
