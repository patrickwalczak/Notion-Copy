import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { BlockOperationsContext } from '../../providers/BlockOperationsProvider';
import Operation from './Operation';
import { ElementOperationPopupContext } from './ElementOperationPopup';
import ColorOperation from './colorOperation/ColorOperation';

const TextBlockOperations = ({
	closePopup,
	resetPopupPosition,
}: {
	closePopup: () => void;
	resetPopupPosition: () => void;
}) => {
	const { operations, element } = useSafeContext(ElementOperationPopupContext);
	const { deleteBlock, duplicateBlock, changeColor } = useSafeContext(BlockOperationsContext);

	const handleDelete = async () => {
		closePopup();
		resetPopupPosition();
		await deleteBlock(element.id);
	};

	const handleDuplicate = async () => {
		closePopup();
		resetPopupPosition();
		await duplicateBlock(element.id);
	};

	const handleColorChange = async (value: string) => {
		await changeColor(element.id, { textColor: value });
	};

	const handleBackgroundChange = async (value: string) => {
		await changeColor(element.id, { backgroundColor: value });
	};

	return (
		<>
			{operations.includes('delete') && <Operation label="Delete" handleAction={handleDelete} />}
			{operations.includes('duplicate') && <Operation label="Duplicate" handleAction={handleDuplicate} />}
			{operations.includes('color') && (
				<ColorOperation changeColor={handleColorChange} changeBackground={handleBackgroundChange} />
			)}
		</>
	);
};

export default TextBlockOperations;
