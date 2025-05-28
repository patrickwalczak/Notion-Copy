'use client';

import React, { useState } from 'react';
import useIsOpenState from '@/hooks/useIsOpenState';
import styles from './styles.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export const IconManager = () => {
	const { isOpen, open, close, toggleVisibility } = useIsOpenState();
	const [emojiUrl, setEmojiUrl] = useState('!!!');

	const containerRef = useOutsideClick(close, isOpen);

	return (
		<div ref={containerRef}>
			<button className={`${styles.button} button-empty p-025 bg-transition`} onClick={toggleVisibility}>
				{emojiUrl}
			</button>
		</div>
	);
};
