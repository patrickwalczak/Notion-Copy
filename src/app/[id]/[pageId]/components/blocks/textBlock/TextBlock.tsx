import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import { deleteBlockRequest, updateBlockNameRequest } from '@/lib/api/block';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { PageContext } from '../../pageClient/PageClient';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { BlockTypesType } from '@/types/block';

const TextBlock = ({
	blockId,
	name,
	blockType,
	order,
}: {
	blockId: string;
	name: string;
	blockType: BlockTypesType;
	order: number;
}) => {
	const { dispatch } = useSafeContext(PagesContext);
	const { getFocusableBlocks, setFocusedBlock, newElementId, clearNewElementId, focusPreviousBlock } =
		useSafeContext(PageContext);

	const deleteBlock = async (blockId: string) => {
		try {
			dispatch({ type: 'deleteBlock', payload: { blockId } });
			focusPreviousBlock(blockId);
			await deleteBlockRequest(blockId);
		} catch (err) {
			console.log(err);
		}
	};

	const updateBlockName = async (value: string, previousValue: string, blockId: string) => {
		try {
			dispatch({ type: 'updateBlockName', payload: { blockId: blockId, newName: value } });
			await updateBlockNameRequest({ blockId: blockId, name: value });
		} catch (err) {
			dispatch({ type: 'updateBlockName', payload: { blockId: blockId, newName: previousValue } });
		}
	};

	const handleDispatch = async (value: string) => {
		const previousName = name;

		if (name === '' && value === '') {
			await deleteBlock(blockId);
			return;
		}

		if (previousName === value) return;

		await updateBlockName(value, previousName, blockId);
	};

	const contentEditableController = useRef<ContentEditableController | null>(null);

	useEffect(() => {
		contentEditableController.current = new ContentEditableController(handleDispatch, name);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refCallback = (node: HTMLDivElement) => {
		const refsMap = getFocusableBlocks();

		if (node) {
			if (!!name) node.innerText = name;
			if (blockId === newElementId.current) {
				node.focus();
				clearNewElementId();
			}

			refsMap.set(blockId, { type: blockType, element: node, id: blockId, order });
		}

		return () => {
			refsMap.delete(blockId);
		};
	};

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const handleExtendedFocus = (event: React.FocusEvent) => {
		const target = event.target as HTMLElement;
		setFocusedBlock({ type: blockType, id: blockId, element: target, order });
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
			onInput={contentEditableController.current?.handleInput}
			onPaste={contentEditableController.current?.handlePaste}
			onKeyDown={contentEditableController.current?.handleKeyDown}
			onFocus={handleExtendedFocus}
			onClick={handleClick}
			data-placeholder={`Type your text here...`}
			data-css-is-empty={name ? false : true}
		/>
	);
};

export default TextBlock;
