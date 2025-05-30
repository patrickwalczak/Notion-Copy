'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { ContentEditableController } from '@/utils/ContentEditableController';
import { NO_TITLE_PLACEHOLDER } from '@/constants';

export const PageTitle = () => {
	const { page } = useAppSelector((state) => state.page);
	const dispatch = useAppDispatch();
	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(dispatch, page?.id),
		[page?.id, dispatch]
	);
	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const isInitialized = useRef(false);

	useEffect(() => {
		if (headingRef.current && !isInitialized.current && page) {
			const { name } = page;
			headingRef.current.innerText = name;
			if (!name) headingRef.current.focus();
			isInitialized.current = true;
		}
	}, [headingRef, page]);

	return (
		<h1
			ref={headingRef}
			className={styles.h1}
			spellCheck
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			aria-label="Edit page title"
			title="Edit page title"
			onInput={handleInput}
			onPaste={handlePaste}
			onKeyDown={handleKeyDown}
			data-placeholder={NO_TITLE_PLACEHOLDER}
			data-css-is-empty={page?.name ? false : true}
		/>
	);
};
