'use client';

import React, { useRef } from 'react';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { renamePage } from '@/lib/features/pages/pagesSlice';
import DOMPurify from 'dompurify';

// const placeCursorAtTheEnd = (node) => {
// 	const selection = window.getSelection();
// 	const range = document.createRange();
// 	range.selectNodeContents(node);

// 	if (!selection) return;

// 	selection.removeAllRanges();
// 	selection.addRange(range);
// };

function placeCaretAtEnd(el) {
	const range = document.createRange();
	range.selectNodeContents(el);
	range.collapse(false);

	const selection = window.getSelection();

	if (!selection) return;

	selection.removeAllRanges();
	selection.addRange(range);
}

export const PageTitle = () => {
	const { page } = useAppSelector((state) => state.pages);
	const dispatch = useAppDispatch();
	const headingRef = useRef(null);
	const undoStack = useRef<string[]>([]);
	const redoStack = useRef<string[]>([]);
	const ignoreOnInput = useRef(false);

	const handleInput = (e: React.ChangeEvent<HTMLHeadingElement>) => {
		if (ignoreOnInput.current) {
			ignoreOnInput.current = false;
			return;
		}

		console.log('handle input');

		const name = e.target.innerText || '';

		if (name !== undoStack.current.at(-1)) {
			undoStack.current.push(name);
		}

		placeCaretAtEnd(e.target);

		dispatch(renamePage({ id: page.id, name }));
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
		console.log('handle paste');
		e.preventDefault();
		const element = e.currentTarget;

		const rawText = e.clipboardData.getData('text/plain');
		const cleanText = DOMPurify.sanitize(rawText);
		const newText = element.innerText + cleanText;

		element.innerText = newText;

		undoStack.current.push(newText);

		placeCaretAtEnd(element);
	};

	const handleKeyDown = (event) => {
		const { key, ctrlKey, target } = event;

		if (ctrlKey && key === 'z' && undoStack.current.length) {
			console.log('undo');

			handleUndo(target);
		}

		if (ctrlKey && key === 'y' && redoStack.current.length) {
			console.log('redo');

			handleRedo(target);
		}
	};

	const handleUndo = (element: HTMLHeadingElement) => {
		ignoreOnInput.current = true;

		const stackElement = undoStack.current.pop();

		if (stackElement) redoStack.current.push(stackElement);

		const lastStack = undoStack.current.at(-1) || '';

		element.innerText = lastStack;
		dispatch(renamePage({ id: page.id, name: lastStack }));

		placeCaretAtEnd(element);
	};

	const handleRedo = (element: HTMLHeadingElement) => {
		ignoreOnInput.current = true;

		const stackElement = redoStack.current.pop();
		if (!stackElement) return;

		const currentValue = element.innerText;

		if (currentValue !== undoStack.current.at(-1)) {
			undoStack.current.push(currentValue);
		}

		element.innerText = stackElement;
		dispatch(renamePage({ id: page.id, name: stackElement }));

		placeCaretAtEnd(element);
	};

	return (
		<h1
			ref={headingRef}
			className={`${styles.h1}`}
			spellCheck
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			aria-label={'Edit page title'}
			onInput={handleInput}
			onPaste={handlePaste}
			onKeyDown={handleKeyDown}
			data-placeholder="New page"
			data-css-is-empty={page?.name ? false : true}
		/>
	);
};
