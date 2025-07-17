import React from 'react';
import styles from './styles.module.scss';
import { deleteBlockRequest, updateBlockNameRequest } from '@/lib/api/block';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { PageContext } from '../../pageClient/PageClient';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { BlockTypesType } from '@/types/block';
import { useContentEditableController } from '@/lib/hooks/useContentEditable';

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

	const handleUpdate = async (value: string) => {
		const previousName = name;

		if (name === '' && value === '') {
			await deleteBlock(blockId);
			return;
		}

		if (previousName === value) return;

		await updateBlockName(value, previousName, blockId);
	};

	const { handleInput, handleKeyDown, handlePaste } = useContentEditableController(name, handleUpdate);

	const refCallback = (node: HTMLDivElement) => {
		const refsMap = getFocusableBlocks();

		if (node) {
			if (!!name) node.innerText = name;
			if (blockId === newElementId.current) {
				node.focus();
				clearNewElementId();
			}

			refsMap.set(blockId, { type: blockType, element: node, id: blockId, order, isFocusable: true });
		}

		return () => {
			refsMap.delete(blockId);
		};
	};

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const handleFocus = (event: React.FocusEvent) => {
		const target = event.target as HTMLElement;
		setFocusedBlock({ type: blockType, id: blockId, element: target, order, isFocusable: true });
	};

	const handleExtendedKeyDown = (event: React.KeyboardEvent) => {
		const target = event.target as HTMLElement;

		if (event.key === 'Enter') {
			target.blur();
			event.preventDefault();
			return;
		}

		if (event.key === 'Backspace' && target.innerText === '') {
			event.preventDefault();
			event.stopPropagation();
			handleUpdate('');
			return;
		}

		handleKeyDown(event);
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
			onKeyDown={handleExtendedKeyDown}
			onFocus={handleFocus}
			onClick={handleClick}
			data-placeholder={`Type your text here...`}
			data-css-is-empty={name ? false : true}
		/>
	);
};

export default TextBlock;
