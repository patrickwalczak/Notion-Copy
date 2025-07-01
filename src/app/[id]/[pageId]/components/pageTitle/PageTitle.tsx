'use client';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';

export const PageTitle = () => {
	const {
		dispatch,
		state: { page },
	} = useSafeContext(PagesContext);
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const isInitialCall = useRef(false);

	const handleDispatch = useCallback(
		(value: string) => {
			dispatch({ type: 'renamePage', payload: { name: value, id: page?.id } });
		},
		[dispatch, page?.id]
	);

	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(handleDispatch),
		[handleDispatch]
	);

	useEffect(() => {
		if (headingRef.current && !isInitialCall.current) {
			isInitialCall.current = true;
			if (!!page?.properties?.name) {
				headingRef.current.innerText = (page?.properties?.name as string) || '';
			} else {
				headingRef.current.focus();
			}
		}
	}, [page?.properties?.name]);

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

	if (!page) return <div className={`${styles.loader} shimmerLoader`}></div>;

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
