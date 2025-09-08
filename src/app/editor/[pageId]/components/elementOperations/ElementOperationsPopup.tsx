import { EditorElementShapes, EditorElementTypes } from '@/types/elements';
import TextBlockOperations from './TextBlockOperations';
import ElementOperationPopup from './ElementOperationPopup';
import PageOperations from './PageOperationsPopup';
import { PAGE_OPERATIONS, TEXT_ELEMENT_OPERATIONS } from '../../utils/operations';

type OperationsPopupType = {
	elementType: EditorElementTypes | undefined;
	element: EditorElementShapes | undefined;
	resetPopupPosition: () => void;
	closePopup: () => void;
};

export function ElementOperationsPopup({ element, elementType, closePopup, resetPopupPosition }: OperationsPopupType) {
	if (!element || !elementType) return null;

	switch (elementType) {
		case 'text':
			return (
				<ElementOperationPopup element={element} operations={[...TEXT_ELEMENT_OPERATIONS]}>
					<TextBlockOperations closePopup={closePopup} resetPopupPosition={resetPopupPosition} />
				</ElementOperationPopup>
			);
		case 'page':
			return (
				<ElementOperationPopup element={element} operations={[...PAGE_OPERATIONS]}>
					<PageOperations closePopup={closePopup} resetPopupPosition={resetPopupPosition} />
				</ElementOperationPopup>
			);
		default:
			return null;
	}
}
