'use client';

import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import ContentEditable from '../contentEditable/ContentEditable';

const EditPagePopup = ({ togglePopup, isOpen }: { togglePopup: () => void; isOpen: boolean }) => {
	const handleInput = (e: any) => {
		const newValue = e.target.innerText.trim();

		// dispatch({ type: ActionsEnum.UPDATE_TITLE, payload: newValue });
	};

	const callbackRef = useCallback((node: HTMLDivElement | null) => {
		if (!node) return;

		// node.innerText = state.title;

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
				:)
			</button>
			<ContentEditable
				ref={callbackRef}
				handleKeyDown={handleKeyDown}
				handleInput={handleInput}
				handlePaste={handlePaste}
				tabIndex={isOpen ? 0 : -1}
				className={`${styles.contentEditable} block flex-grow-1 p-025 rounded-sm`}
				ariaLabel="Start typing to edit text"
			/>
		</div>
	);
};

export default EditPagePopup;
