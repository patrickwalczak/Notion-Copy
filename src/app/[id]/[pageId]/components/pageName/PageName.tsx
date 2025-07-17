'use client';

import React from 'react';
import styles from './styles.module.scss';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { renamePageRequest } from '@/lib/api/page';
import { PageContext } from '../pageClient/PageClient';
import { useContentEditableController } from '@/lib/hooks/useContentEditable';

export const PageName = ({ name, id }: { name: string; id: string }) => {
	const { dispatch } = useSafeContext(PagesContext);
	const { setFocusedBlock, getFocusableBlocks } = useSafeContext(PageContext);

	const { handleInput, handleKeyDown, handlePaste } = useContentEditableController(name, handleUpdate);

	const refCallback = (node: HTMLDivElement) => {
		const refsMap = getFocusableBlocks();

		if (node) {
			if (name) node.innerText = name;
			else node.focus();

			refsMap.set(id, { type: 'pageName', element: node, id, order: 0, isFocusable: true });
		}

		return () => {
			refsMap.delete(id);
		};
	};

	async function handleUpdate(value: string) {
		const previousName = name;

		if (previousName === value) return;

		dispatch({
			type: 'renamePage',
			payload: { pageId: id, newName: value },
		});

		try {
			await renamePageRequest(id, value);
		} catch (err) {
			console.error('Failed to sync page name:', err);

			dispatch({
				type: 'renamePage',
				payload: { pageId: id, newName: previousName },
			});
		}
	}

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const handleFocus = (event: React.FocusEvent) => {
		setFocusedBlock({ type: 'pageName', id, element: event.target as HTMLElement, order: 0, isFocusable: true });
	};

	const handleExtendedKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			return;
		}

		handleKeyDown(event);
	};

	return (
		<h1
			ref={refCallback}
			className={styles.h1}
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			aria-label="Edit page title"
			title="Edit page title"
			onInput={handleInput}
			onPaste={handlePaste}
			onKeyDown={handleExtendedKeyDown}
			onClick={handleClick}
			onFocus={handleFocus}
			data-placeholder={NO_TITLE_PLACEHOLDER}
			data-css-is-empty={name ? false : true}
		/>
	);
};
