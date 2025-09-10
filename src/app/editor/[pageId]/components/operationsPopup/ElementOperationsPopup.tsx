import { EditorElementShapes, EditorElementTypes } from '@/types/elements';
import TextBlockOperations from './TextBlockOperations';
import ElementOperationPopup from './ElementOperationPopup';
import PageOperations from './PageOperationsPopup';
import { PAGE_OPERATIONS, TEXT_ELEMENT_OPERATIONS } from '../../utils/operations';
import { TextElementOperationsType } from '@/types/block';
import { PageOperationsType } from '@/types/page';
import { RefObject } from 'react';

type OperationsPopupType = {
	elementType: EditorElementTypes | undefined;
	element: EditorElementShapes | undefined;
	resetPopupPosition: () => void;
	closePopup: () => void;
	popupRoot: RefObject<HTMLElement | null>;
};

export function ElementOperationsPopup({
	element,
	elementType,
	closePopup,
	resetPopupPosition,
	popupRoot,
}: OperationsPopupType) {
	if (!element || !elementType) return null;

	switch (elementType) {
		case 'text':
			return (
				<ElementOperationPopup
					popupRoot={popupRoot}
					element={element}
					operations={[...TEXT_ELEMENT_OPERATIONS] as TextElementOperationsType[]}
				>
					<TextBlockOperations closePopup={closePopup} resetPopupPosition={resetPopupPosition} />
				</ElementOperationPopup>
			);
		case 'page':
			return (
				<ElementOperationPopup
					popupRoot={popupRoot}
					element={element}
					operations={[...PAGE_OPERATIONS] as PageOperationsType[]}
				>
					<PageOperations closePopup={closePopup} resetPopupPosition={resetPopupPosition} />
				</ElementOperationPopup>
			);
		default:
			return null;
	}
}
