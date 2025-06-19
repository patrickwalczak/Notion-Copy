'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';

export const PageTitle = () => {
	const id = useAppSelector((state) => state.page.page.id);
	const name = useAppSelector((state) => state.page.page.name);
	const dispatch = useAppDispatch();
	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(dispatch, id),
		[id, dispatch]
	);
	const headingRef = useRef<HTMLHeadingElement | null>(null);

	useEffect(() => {
		if (headingRef.current) {
			if (!!name) {
				headingRef.current.innerText = name;
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
			spellCheck
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
			data-css-is-empty={name ? false : true}
		/>
	);
};
