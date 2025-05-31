'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { useSearchParams } from 'next/navigation';

export const PageTitle = () => {
	const searchParams = useSearchParams();
	const { page } = useAppSelector((state) => state.page);
	const dispatch = useAppDispatch();
	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(dispatch, page?.id),
		[page?.id, dispatch]
	);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	// // TODO improve these effects

	// useEffect(() => {
	// 	if (headingRef.current && page) {
	// 		const { name } = page;
	// 		headingRef.current.innerText = name;
	// 		if (!name) headingRef.current.focus();
	// 	}
	// }, [headingRef, page]);

	// useEffect(() => {
	// 	if (headingRef.current) {
	// 		headingRef.current.innerText = '';
	// 	}
	// }, [searchParams]);

	console.log(page);

	useEffect(() => {
		if (headingRef.current) {
			headingRef.current.focus();
		}
	}, [headingRef]);

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
