import React from 'react';
import styles from './styles.module.scss';
import { updateBlockNameRequest } from '@/lib/api/block';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { PageContext } from '../../pageClient/PageClient';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { BlockBaseType } from '@/types/block';
import { useContentEditableController } from '@/lib/hooks/useContentEditable';
import { BlockOperationsContext } from '@/lib/context/blockOperationsContext/BlockOperationsContext';

const TextBlock = ({ block }: { block: BlockBaseType }) => {
	const {
		id: blockId,
		properties: { name },
		type: blockType,
		order,
	} = block;

	const { dispatch } = useSafeContext(PagesContext);
	const { getBlocksRef, setFocusedBlock, newElementId, clearNewElementId } = useSafeContext(PageContext);
	const { deleteBlock } = useSafeContext(BlockOperationsContext);

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
		const refsMap = getBlocksRef();

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
			className={`${styles.block} py-025`}
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
