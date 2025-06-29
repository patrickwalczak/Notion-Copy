'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/lib/store/hooks';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { renamePage } from '@/lib/store/features/pages/pagesSlice';
import { PageContext } from '../../store/PageProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

export const PageTitle = () => {
	const dispatchRedux = useAppDispatch();
	const {
		dispatch,
		state: {
			page: { id, name },
		},
	} = useSafeContext(PageContext);

	const handleDispatch = (value: string) => {
		dispatch({ type: 'renamePage', payload: { name: value } });
		dispatchRedux(renamePage({ id, name: value }));
	};

	const { handleInput, handlePaste, handleKeyDown } = useMemo(() => new ContentEditableController(handleDispatch), []);
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
