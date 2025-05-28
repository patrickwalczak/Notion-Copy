'use client';

import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import ContentEditable from '@/components/contentEditable/ContentEditable';
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

	const handleKeyDown = () => {};

	const handlePaste = () => {};

	return (
		<h1 className={styles.h1}>
			<ContentEditable
				handleInput={handleInput}
				ariaLabel="Edit page title"
				className={styles.contentEditable}
				ref={callbackRef}
				handleKeyDown={handleKeyDown}
				handlePaste={handlePaste}
			/>
		</h1>
	);
};
