'use client';

import React from 'react';
import { PageName } from '../pageName/PageName';
import { Cover } from '../cover/Cover';
import styles from './styles.module.scss';
import PageContent from '../pageContent/PageContent';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { PageContext } from '../pageClient/PageClient';
import { placeCaretAtEnd } from '@/lib/utils/dom';
import { createDefaultBlockRequest } from '@/lib/api/block';

const PageEditor = () => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);
	const { elementsMapRef } = useSafeContext(PageContext);

	const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
		if (!elementsMapRef.current) return;

		const lastElement = page?.elements.at(-1);

		if (!lastElement) return;

		if (lastElement.type === 'text' && !lastElement.properties.name) {
			const element = elementsMapRef.current.get(lastElement.id)!;
			element.element.focus();
			placeCaretAtEnd(element.element, false);
		} else {
			await createDefaultBlock();
		}
	};

	const createDefaultBlock = async () => {
		try {
			if (!page) return;

			const block = await createDefaultBlockRequest(page.id, page.elements.length);
			dispatch({ type: 'createDefaultBlock', payload: { block } });
			console.log(block);
		} catch (error) {
			// TODO handle errors
		}
	};

	const handleKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
		if (event.key === 'Enter') {
			if (!elementsMapRef.current) return;

			const lastElement = page?.elements.at(-1);

			if (!lastElement) return;

			if (lastElement.type === 'text' && !lastElement.properties.name) {
				const element = elementsMapRef.current.get(lastElement.id)!;
				element.element.focus();
				placeCaretAtEnd(element.element, false);
			} else {
				await createDefaultBlock();
			}

			return;
		}

		// TODO
		if (event.key === 'Backspace') {
			console.log('backspace');
			// get focused element
		}
	};

	return (
		<main onKeyDown={handleKeyDown} onClick={handleClick} className={styles.mainContent}>
			<div className={`${styles.contentColumn} flex-column gap-050`}>
				<Cover />
				<div>{page ? <PageName /> : <div className={`${styles.loader} shimmerLoader`}></div>}</div>
				<PageContent />
			</div>
		</main>
	);
};

export default PageEditor;
