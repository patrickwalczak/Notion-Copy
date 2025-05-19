'use client';

import React, { useCallback } from 'react';
import styles from './styles.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';
import { PageContext } from '../../context/PageContext';
import ContentEditable from '@/components/contentEditable/ContentEditable';
import { ActionsEnum } from '../../context/types';

export const PageTitle = () => {
	const { state, dispatch } = useSafeContext(PageContext);

	const handleInput = (e) => {
		const newValue = e.target.innerText.trim();

		dispatch({ type: ActionsEnum.UPDATE_TITLE, payload: newValue });
	};

	const callbackRef = useCallback((node: HTMLDivElement | null) => {
		if (!node) return;
		node.innerText = state.title;
	}, []);

	const handleKeyDown = () => {};

	const handlePaste = () => {};

	return (
		<h1 className={styles.h1}>
			<ContentEditable
				handleInput={handleInput}
				ariaLabel="Edit page title"
				className={styles.contentEditable}
				ref={callbackRef}
				handleKeyDown={handleKeyDown}
				handlePaste={handlePaste}
			/>
		</h1>
	);
};
