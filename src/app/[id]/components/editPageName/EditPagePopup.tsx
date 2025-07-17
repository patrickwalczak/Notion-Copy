'use client';

import React from 'react';
import styles from './styles.module.scss';
import { useContentEditableController } from '@/lib/hooks/useContentEditable';
import { selectText } from '@/lib/utils/dom';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { renamePageRequest } from '@/lib/api/page';

const EditPagePopup = ({
	togglePopup,
	isOpen,
	pageName,
}: {
	togglePopup: () => void;
	isOpen: boolean;
	pageName: string;
}) => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const { handleInput, handleKeyDown, handlePaste } = useContentEditableController(pageName, handleUpdate);

	const callbackRef = (node: HTMLDivElement) => {
		if (node) {
			node.innerText = pageName || '';
			node.focus();
			selectText(node);
		}
	};

	async function handleUpdate(value: string) {
		const safePage = page!;
		const previousName = safePage.properties.name;

		if (previousName === value) return;

		dispatch({
			type: 'renamePage',
			payload: { pageId: safePage.id, newName: value },
		});

		try {
			await renamePageRequest(safePage.id, value);
		} catch (err) {
			console.error('Failed to sync page name:', err);

			dispatch({
				type: 'renamePage',
				payload: { pageId: safePage.id, newName: previousName },
			});
		}
	}

	const handleToggle = (event: React.KeyboardEvent, target: HTMLElement) => {
		target.blur();
		event.preventDefault();
		togglePopup();
	};

	const handleExtendedKeyDown = (event: React.KeyboardEvent) => {
		const target = event.target as HTMLElement;

		if (event.key === 'Escape') return handleToggle(event, target);

		if (event.key === 'Enter') return handleToggle(event, target);

		if (event.key === 'Backspace' && target.innerText === '') return;

		handleKeyDown(event);
	};

	return (
		<div
			role="dialog"
			aria-modal="true"
			className={`${styles.popup} flex-align-center rounded p-y-025 p-x-050 gap-025`}
			aria-hidden={!isOpen}
		>
			<button tabIndex={isOpen ? 0 : -1} className={`${styles.changeIconBtn} primaryButton`}>
				@
			</button>
			<div
				ref={callbackRef}
				className={`${styles.contentEditable} block flex-grow-1 p-025 rounded-sm`}
				contentEditable
				tabIndex={isOpen ? 0 : -1}
				suppressContentEditableWarning
				role="textbox"
				aria-label={'Start typing to edit text'}
				onInput={handleInput}
				onKeyDown={handleExtendedKeyDown}
				onPaste={handlePaste}
			/>
		</div>
	);
};

export default EditPagePopup;
