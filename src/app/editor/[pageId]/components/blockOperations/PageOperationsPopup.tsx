import React from 'react';
import './styles.scss';
import SearchBox from './SearchBox';
import OperationsFooter from './OperationsFooter';
import OperationsPopupHead from './OperationsPopupHead';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageOperationsContext } from '@/lib/context/pageOperationsContext/PageOperationsContext';
import BlockOperation from './BlockOperation';

const PageOperationsPopup = ({ page }) => {
	const { deletePage } = useSafeContext(PageOperationsContext);

	const handleDelete = async () => {
		await deletePage(page.id);
	};

	return (
		<OperationsPopupHead>
			{/* <div className="block-operations__header">
				<div className="block-operations__search-container">
					<SearchBox />
				</div>
			</div> */}
			<div className="block-operations__scroller">
				<div className="block-operations__listbox-header">Dynamic value</div>
				<ul className="block-operations__listbox" id="listbox" role="listbox">
					<BlockOperation label="Delete" handleAction={handleDelete} />
				</ul>
				<OperationsFooter />
			</div>
		</OperationsPopupHead>
	);
};

export default PageOperationsPopup;
