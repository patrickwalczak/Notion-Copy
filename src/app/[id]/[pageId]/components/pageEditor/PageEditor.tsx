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
	const { elementsMapRef, focusedElementId, newElementId, setFocusedElement, focusPreviousElement, focusNextElement } =
		useSafeContext(PageContext);

	const handleClick = async () => {
		if (!elementsMapRef.current) return;

		const lastElement = page?.elements.at(-1);

		if (!lastElement) return;

		if (lastElement.type === 'text' && !lastElement.properties.name) {
			const element = elementsMapRef.current.get(lastElement.id)!;
			element.element.focus();
			setFocusedElement(element.element, lastElement.id);
			placeCaretAtEnd(element.element, false);
		} else {
			await createDefaultBlock();
		}
	};

	const createDefaultBlock = async () => {
		try {
			if (!page) return;

			const block = await createDefaultBlockRequest(page.id, page.elements.length);
			dispatch({ type: 'createDefaultBlock', payload: { block, order: page.elements.length } });
		} catch (error) {
			// TODO handle errors
		}
	};

	const handleKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
		if (!page) return;

		if (event.key === 'Enter') {
			if (!elementsMapRef.current) return;

			if (focusedElementId.current) {
				const element = page.elements.find((element) => element.id === focusedElementId.current!);

				if (!element) return;

				try {
					const block = await createDefaultBlockRequest(page.id, element.order + 1);
					dispatch({ type: 'createDefaultBlock', payload: { block, order: element.order + 1 } });
					newElementId.current = block.id;
				} catch (error) {
					// TODO handle errors
				}
			}

			return;
		}

		if (event.key === 'ArrowUp') {
			if (!focusedElementId.current) return;
			focusPreviousElement(focusedElementId.current);

			return;
		}

		if (event.key === 'ArrowDown') {
			if (!focusedElementId.current) return;
			focusNextElement(focusedElementId.current);
		}
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
