'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
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
	const headingRef = useRef<HTMLHeadingElement | null>(null);

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

	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(handleDispatch),
		[handleDispatch]
	);

	useEffect(() => {
		if (headingRef.current) {
			if (page?.properties.name) {
				headingRef.current.innerText = page.properties.name;
			} else {
				headingRef.current.focus();
			}
		}
	}, []);

	const onKeyDownExtended = (event: React.KeyboardEvent<HTMLHeadingElement>) => {
		const element = event.target as HTMLHeadingElement;

		if (event.key === 'Enter') {
			event.preventDefault();
			element.blur();
			return;
		}

		handleKeyDown(event);
	};

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<h1
			ref={headingRef}
			className={styles.h1}
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			aria-label="Edit page title"
			title="Edit page title"
			onInput={handleInput}
			onPaste={handlePaste}
			onKeyDown={onKeyDownExtended}
			onClick={handleClick}
			data-placeholder={NO_TITLE_PLACEHOLDER}
			data-css-is-empty={page?.properties?.name ? false : true}
		/>
	);
};
