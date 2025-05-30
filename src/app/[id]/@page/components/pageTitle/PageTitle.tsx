'use client';

import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { ContentEditableController } from '@/utils/ContentEditableController';

export const PageTitle = () => {
	const { page } = useAppSelector((state) => state.pages);
	const dispatch = useAppDispatch();
	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(dispatch, page.id),
		[page.id, dispatch]
	);

	return (
		<h1
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
