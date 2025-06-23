'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import styles from './styles.module.scss';

import React, { useRef, useEffect, useMemo } from 'react';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';

const EditableDiv = ({ id, properties }) => {
	const { focusedElement } = useAppSelector((state) => state.page.page);

	const elementRef = useRef<HTMLDivElement>(null);

	const dispatch = useAppDispatch();
	const { handleInput, handlePaste, handleKeyDown } = useMemo(
		() => new ContentEditableController(dispatch, id),
		[id, dispatch]
	);

	// TODO, maybe a custom hook
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
			if (focusedElement === id) {
				elementRef.current.focus();
			}
		}
	}, [focusedElement, id]);

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
