'use client';

import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { renamePageRequest } from '@/lib/api/page';
import { PageContext } from '../pageClient/PageClient';

export const PageName = ({ name, id }: { name: string; id: string }) => {
	const { dispatch } = useSafeContext(PagesContext);
	const { setFocusedBlock, getFocusableBlocks } = useSafeContext(PageContext);

	const handleDispatch = useCallback(
		async (value: string) => {
			const previousName = name;

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
		},
		[dispatch, id, name]
	);

	const { handleInput, handlePaste, handleKeyDown, handleFocus } = useMemo(
		() => new ContentEditableController(handleDispatch, name || ''),
		[handleDispatch, name]
	);

	const refCallback = (node: HTMLDivElement) => {
		const refsMap = getFocusableBlocks();

		if (node) {
			if (!!name) {
				node.innerText = name || '';
			} else node.focus();

			refsMap.set(id, { type: 'pageName', element: node, id });
		}

		return () => {
			refsMap.delete(id);
		};
	};

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const handleExtendedFocus = (event: React.FocusEvent) => {
		handleFocus(event);
		setFocusedBlock({ type: 'pageName', id, element: event.target as HTMLElement });
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
			onKeyDown={handleKeyDown}
			onClick={handleClick}
			onFocus={handleExtendedFocus}
			data-placeholder={NO_TITLE_PLACEHOLDER}
			data-css-is-empty={name ? false : true}
		/>
	);
};
