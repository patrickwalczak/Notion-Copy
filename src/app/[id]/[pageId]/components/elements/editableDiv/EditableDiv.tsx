'use client';

import styles from './styles.module.scss';

import React, { useRef, useEffect, useMemo } from 'react';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';

const EditableDiv = ({ id, properties }) => {
	const {
		state: { focusedElementId },
	} = useSafeContext(PagesContext);

	const elementRef = useRef<HTMLDivElement>(null);

	const handleDispatch = (value: string) => {};

	const { handleInput, handlePaste, handleKeyDown } = useMemo(() => new ContentEditableController(handleDispatch), []);

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
			onKeyDown={handleKeyDown}
			onClick={(e) => e.stopPropagation()}
			data-placeholder={'Type something...'}
			data-css-is-empty={properties.content ? false : true}
		/>
	);
};

export default EditableDiv;
