'use client';

import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { renamePageRequest } from '@/lib/api/page';

export const PageName = () => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);

	const handleDispatch = useCallback(
		async (value: string) => {
			if (!page?.id) return;

			const previousName = page.properties.name;

			dispatch({
				type: 'renamePage',
				payload: { pageId: page.id, newName: value },
			});

			try {
				if (previousName === value || !value) return;

				await renamePageRequest(page.id, value);
			} catch (err) {
				console.error('Failed to sync page name:', err);

				dispatch({
					type: 'renamePage',
					payload: { pageId: page.id, newName: previousName },
				});
			}
		},
		[dispatch, page?.id, page?.properties.name]
	);

	const { handleInput, handlePaste, handleKeyDown, handleFocus } = useMemo(
		() => new ContentEditableController(handleDispatch),
		[handleDispatch]
	);

	const refCallback = useCallback((node: HTMLDivElement) => {
		if (node) {
			if (!!page?.properties.name) {
				node.innerText = page?.properties.name || '';
			} else node.focus();
		}
	}, []);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
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
			onFocus={handleFocus}
			data-placeholder={NO_TITLE_PLACEHOLDER}
			data-css-is-empty={page?.properties?.name ? false : true}
		/>
	);
};
