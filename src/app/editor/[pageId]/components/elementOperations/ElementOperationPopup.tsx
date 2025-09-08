import React, { createContext, ReactNode, useState } from 'react';
import './styles.scss';
import SearchBox from './SearchBox';
import OperationsFooter from './OperationsFooter';
import OperationsPopupHead from './OperationsPopupHead';
import { EditorElementShapes } from '@/types/elements';

interface ElementOperationPopupContextType {
	operations: string[];
	element: EditorElementShapes;
}

export const ElementOperationPopupContext = createContext<ElementOperationPopupContextType | null>(null);

const ElementOperationPopup = ({
	element,
	children,
	operations,
}: {
	element: EditorElementShapes;
	children: ReactNode;
	operations: string[];
}) => {
	const [filteredOperations, setFilteredOperations] = useState(operations);

	const filterOperations = (query: string) => {
		const filtered = operations.filter((operation) => operation.toLowerCase().includes(query.toLowerCase()));
		setFilteredOperations(filtered);
	};

	const ctx = {
		operations: filteredOperations,
		element,
	};

	return (
		<ElementOperationPopupContext.Provider value={ctx}>
			<OperationsPopupHead>
				<div className="block-operations__header">
					<div className="block-operations__search-container">
						<SearchBox onSearch={filterOperations} />
					</div>
				</div>
				<div className="block-operations__scroller">
					<div className="block-operations__listbox-header">{element.type.toUpperCase()}</div>
					<ul className="block-operations__listbox" id="listbox" role="listbox">
						{children}
					</ul>
					<OperationsFooter />
				</div>
			</OperationsPopupHead>
		</ElementOperationPopupContext.Provider>
	);
};

export default ElementOperationPopup;
