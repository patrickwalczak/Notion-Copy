'use client';

import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { renamePage as renamePageInPages } from '@/lib/store/features/pages/pagesSlice';
import { renamePage } from '@/lib/store/features/page/pageSlice';

const EditPagePopup = ({ togglePopup, isOpen }: { togglePopup: () => void; isOpen: boolean }) => {
	const { page } = useAppSelector((state) => state.page);
	const dispatch = useAppDispatch();
	const isInitialRender = useRef(false);

	const handleInput = (e: any) => {
		const newValue = e.target.innerText.trim();

		dispatch(renamePageInPages({ id: page.id, name: newValue }));
		dispatch(renamePage({ name: newValue }));
	};

	const callbackRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node || !isInitialRender.current) return;

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

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.target.blur();
			togglePopup();
		}
	};

	const handlePaste = (e: any) => {};

	return (
		<div
			role="dialog"
			aria-modal="true"
			className={`${styles.popup} flex-align-center rounded p-y-025 p-x-050 gap-025`}
			aria-hidden={!isOpen}
		>
			<button
				tabIndex={isOpen ? 0 : -1}
				className={`${styles.changeIconBtn} flex-center flex-shrink-0 p-025 rounded-sm bg-transition bg-hover button-empty`}
			>
				@
			</button>
			<div
				ref={callbackRef}
				className={`${styles.contentEditable} block flex-grow-1 p-025 rounded-sm`}
				spellCheck
				contentEditable
				tabIndex={isOpen ? 0 : -1}
				suppressContentEditableWarning
				role="textbox"
				aria-label={'Start typing to edit text'}
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				onPaste={handlePaste}
			/>
		</div>
	);
};

export default EditPagePopup;
