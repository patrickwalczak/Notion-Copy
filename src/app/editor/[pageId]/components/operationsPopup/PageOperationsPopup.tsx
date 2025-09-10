import React from 'react';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageOperationsContext } from '@/app/editor/providers/PageOperationsProvider';
import { ElementOperationPopupContext } from './ElementOperationPopup';
import Operation from './Operation';

const PageOperations = ({
	closePopup = () => {},
	resetPopupPosition = () => {},
}: {
	closePopup?: () => void;
	resetPopupPosition?: () => void;
}) => {
	const { element, operations } = useSafeContext(ElementOperationPopupContext);

	const { deletePage } = useSafeContext(PageOperationsContext);

	const handleDelete = async () => {
		await deletePage(element.id);
		resetPopupPosition();
		closePopup();
	};

	return <>{operations.includes('delete') && <Operation label="Delete" handleAction={handleDelete} />}</>;
};

export default PageOperations;
