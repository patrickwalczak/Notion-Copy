import React from 'react';
import './styles.scss';
import SearchBox from './SearchBox';
import OperationsFooter from './OperationsFooter';
import OperationsPopupHead from './OperationsPopupHead';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { BlockOperationsContext } from '@/lib/context/blockOperationsContext/BlockOperationsContext';
import { BlockBaseType } from '@/types/block';
import BlockOperation from './BlockOperation';

const BlockOperationsPopup = ({ block }: { block: BlockBaseType }) => {
	const { deleteBlock } = useSafeContext(BlockOperationsContext);

	const handleDelete = async () => {
		await deleteBlock(block.id);
	};

	return (
		<OperationsPopupHead>
			{/* Implement a search functionality */}
			{/* <div className="block-operations__header">
				<div className="block-operations__search-container">
					<SearchBox />
				</div>
			</div> */}
			<div className="block-operations__scroller">
				<div className="block-operations__listbox-header">{'block.type'}</div>
				<ul className="block-operations__listbox" id="listbox" role="listbox">
					<BlockOperation label="Delete" handleAction={handleDelete} />
				</ul>
				<OperationsFooter />
			</div>
		</OperationsPopupHead>
	);
};

export default BlockOperationsPopup;
