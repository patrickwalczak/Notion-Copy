'use client';

import React from 'react';
import styles from './styles.module.scss';

const EditPagePopup = ({
	togglePopup,
	isOpen,
	pageName,
	handleInput,
}: {
	togglePopup: () => void;
	isOpen: boolean;
	pageName: string;
	handleInput: (e: React.ChangeEvent<HTMLDivElement>) => void;
}) => {
	const callbackRef = (node: HTMLDivElement | null) => {
		if (!node) return;

		node.innerText = pageName || '';

		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(node);

		if (!selection) return;

		selection.removeAllRanges();
		selection.addRange(range);

		node.focus();
	};

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			e.target.blur();
			togglePopup();
		}
	};

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
			/>
		</div>
	);
};

export default EditPagePopup;
