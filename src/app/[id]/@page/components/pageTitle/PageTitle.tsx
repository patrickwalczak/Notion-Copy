'use client';

import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { renamePage } from '@/lib/features/pages/pagesSlice';

export const PageTitle = () => {
	const { page } = useAppSelector((state) => state.pages);
	const dispatch = useAppDispatch();
	const isInitialRender = useRef(true);

	const handleInput = (e) => {
		const newValue = e.target.innerText.trim();

		dispatch(renamePage({ id: page.id, name: newValue }));
	};

	const callbackRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node || !isInitialRender.current) return;

			isInitialRender.current = false;

			node.innerText = page?.name;

			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(node);

			if (!selection) return;

			selection.removeAllRanges();
			selection.addRange(range);

			node.focus();
		},
		[page?.name]
	);

	return (
		<h1
			ref={callbackRef}
			className={styles.h1}
			spellCheck
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			aria-label={'Edit page title'}
			onInput={handleInput}
		/>
	);
};
