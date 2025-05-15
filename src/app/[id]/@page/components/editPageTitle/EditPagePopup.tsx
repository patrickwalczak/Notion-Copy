'use client';

import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { PageContext } from '@/app/[id]/@page/context/PageContext';
import { useSafeContext } from '@/hooks/useSafeContext';
import { ActionsEnum } from '@/app/[id]/@page/context/types';
import ContentEditable from '../../../../../components/contentEditable/ContentEditable';

const EditPagePopup = ({ togglePopup }: { togglePopup: () => void }) => {
	const { state, dispatch } = useSafeContext(PageContext);

	const handleInput = (e: any) => {
		const newValue = e.target.innerText.trim();

		dispatch({ type: ActionsEnum.UPDATE_TITLE, payload: newValue });
	};

	const callbackRef = useCallback((node: HTMLDivElement | null) => {
		if (!node) return;

		node.innerText = state.title;

		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);

		if (!selection) return;

		selection.removeAllRanges();
		selection.addRange(range);

		node.focus();
	}, []);

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.target.blur();
			togglePopup();
		}
	};

	const handlePaste = (e: any) => {};

	return (
		<div role="dialog" aria-modal="true" className={styles.popup}>
			<button className={styles.button}>Icon</button>
			<ContentEditable
				ref={callbackRef}
				handleKeyDown={handleKeyDown}
				handleInput={handleInput}
				handlePaste={handlePaste}
				className={styles.input}
				ariaLabel="Start typing to edit text"
			/>
		</div>
	);
};

export default EditPagePopup;
