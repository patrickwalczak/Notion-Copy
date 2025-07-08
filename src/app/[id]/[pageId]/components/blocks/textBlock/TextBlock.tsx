import React, { useCallback, useMemo } from 'react';
import styles from './styles.module.scss';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { updateBlockNameRequest } from '@/lib/api/block';

const TextBlock = ({
	blockId,
	name,
	getElementsMapRef,
	blockType,
}: {
	blockId: string;
	name: string;
	getElementsMapRef: () => Map<string, { type: string; element: HTMLDivElement }>;
	blockType: string;
}) => {
	const { dispatch } = useSafeContext(PagesContext);

	const handleDispatch = useCallback(
		async (value: string) => {
			const previousName = name;

			dispatch({ type: 'updateBlockName', payload: { blockId: blockId, newName: value } });

			try {
				if (previousName === value || !value) return;

				await updateBlockNameRequest({ blockId: blockId, name: value });
			} catch (err) {
				console.error('Failed to sync page name:', err);

				dispatch({ type: 'updateBlockName', payload: { blockId: blockId, newName: previousName } });
			}
		},
		[blockId, name, dispatch]
	);

	const { handleInput, handlePaste, handleKeyDown, handleFocus } = useMemo(
		() => new ContentEditableController(handleDispatch),
		[handleDispatch]
	);

	const refCallback = useCallback((node: HTMLDivElement) => {
		const refsMap = getElementsMapRef();

		if (node) {
			if (!!name) node.innerText = name;

			refsMap.set(blockId, { type: blockType, element: node });
		}

		return () => {
			refsMap.delete(blockId);
		};
	}, []);

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div
			data-block-id={blockId}
			ref={refCallback}
			className={`${styles.block} p-y-025`}
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			onInput={handleInput}
			onPaste={handlePaste}
			onKeyDown={handleKeyDown}
			onFocus={handleFocus}
			onClick={handleClick}
			data-placeholder={`Type your text here...`}
			data-css-is-empty={name ? false : true}
		/>
	);
};

export default TextBlock;
