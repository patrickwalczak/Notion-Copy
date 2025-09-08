import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { BlockOperationsContext } from '../../providers/BlockOperationsProvider';
import Operation from './Operation';
import { ElementOperationPopupContext } from './ElementOperationPopup';

const TextBlockOperations = ({
	closePopup,
	resetPopupPosition,
}: {
	closePopup: () => void;
	resetPopupPosition: () => void;
}) => {
	const { operations, element } = useSafeContext(ElementOperationPopupContext);

	const { deleteBlock } = useSafeContext(BlockOperationsContext);

	const handleDelete = async () => {
		closePopup();
		resetPopupPosition();
		await deleteBlock(element.id);
	};

	return <>{operations.includes('delete') && <Operation label="Delete" handleAction={handleDelete} />}</>;
};

export default TextBlockOperations;
