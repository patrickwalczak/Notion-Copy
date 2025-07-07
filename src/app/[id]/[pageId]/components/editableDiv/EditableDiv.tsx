'use client';

import styles from './styles.module.scss';

import React, { useRef, useEffect, useMemo } from 'react';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';

const EditableDiv = ({ id, properties, handleDispatch }) => {
	const {
		state: { focusedElementId },
	} = useSafeContext(PagesContext);

	const elementRef = useRef<HTMLDivElement>(null);

	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(handleDispatch),
		[handleDispatch]
	);

	useEffect(() => {
		if (elementRef.current) {
			if (!!properties.content) {
				elementRef.current.innerText = properties.content;
			} else {
				elementRef.current.focus();
			}
		}
	}, []);

	useEffect(() => {
		if (elementRef.current) {
			if (focusedElementId === id) {
				elementRef.current.focus();
			}
		}
	}, [focusedElementId, id]);

	const extendedKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		const element = event.target as HTMLDivElement;

		if (event.key === 'Enter') {
			event.preventDefault();
			element.blur();
			return;
		}

		handleKeyDown(event);
	};

	return (
		<div
			ref={elementRef}
			className={styles.element}
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			onInput={handleInput}
			onPaste={handlePaste}
			onKeyDown={extendedKeyDown}
			onClick={(e) => e.stopPropagation()}
			data-placeholder={'Type something...'}
			data-css-is-empty={properties.content ? false : true}
		/>
	);
};

export default EditableDiv;
