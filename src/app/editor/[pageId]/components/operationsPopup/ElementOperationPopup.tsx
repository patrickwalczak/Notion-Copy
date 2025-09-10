'use client';

import React, { createContext, ReactNode, useState } from 'react';
import './styles.scss';
import SearchBox from './searchBox/SearchBox';
import { EditorElementShapes, EditorElementsOperations } from '@/types/elements';
import { createPortal } from 'react-dom';
import PopupWrapper from './popupWrapper/PopupWrapper';
import PopupContentShell from './popupContentShell/PopupContentShell';
import PopupFooter from './PopupFooter';
import styles from './elementOperationPopup.module.scss';
import OptionList from './optionList/OptionList';
import { mergeClasses } from '@/lib/utils/mergeClasses';

interface ElementOperationPopupContextType {
	operations: string[];
	element: EditorElementShapes;
}

export const ElementOperationPopupContext = createContext<ElementOperationPopupContextType | null>(null);

const ElementOperationPopup = ({
	element,
	children,
	operations,
	popupRoot,
}: {
	element: EditorElementShapes;
	children: ReactNode;
	operations: EditorElementsOperations[];
	popupRoot: React.RefObject<HTMLElement | null>;
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
		popupRoot.current &&
		createPortal(
			<ElementOperationPopupContext.Provider value={ctx}>
				<PopupWrapper className={styles.dialog} initialPosition={{ top: 0, right: '100%' }}>
					<PopupContentShell className="gap-050">
						<div className="px-050">
							<SearchBox onSearch={filterOperations} />
						</div>
						<OptionList className="px-025 gap-025">
							<OptionList.Header>{element.type}</OptionList.Header>
							<OptionList.List className={mergeClasses(styles.listbox, 'gap-025')}>{children}</OptionList.List>
						</OptionList>
						<PopupFooter />
					</PopupContentShell>
				</PopupWrapper>
			</ElementOperationPopupContext.Provider>,
			popupRoot.current
		)
	);
};

export default ElementOperationPopup;
