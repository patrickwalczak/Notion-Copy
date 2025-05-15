'use client';

import React, { useState } from 'react';
import useVisibilityManager from '@/hooks/useVisibilityManager';
import styles from './styles.module.scss';
import { useSafeContext } from '@/hooks/useSafeContext';
import { AppContext } from '@/context/AppContext';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export const IconManager = () => {
	const { state, dispatch } = useSafeContext(AppContext);
	const { isOpen, open, close, toggleVisibility } = useVisibilityManager();
	const [emojiUrl, setEmojiUrl] = useState('!!!');

	const containerRef = useOutsideClick(close, isOpen);

	return (
		<div ref={containerRef}>
			<button className={styles.button} onClick={toggleVisibility}>
				{emojiUrl}
			</button>
		</div>
	);
};
