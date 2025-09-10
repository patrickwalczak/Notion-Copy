import { PageModelType } from '@/types/page';
import { PLACEHOLDER_BLOCK_ID } from '../constants';
import { BlockElementType } from '@/types/block';

export const getPlaceholderBlock = (order: number, pageId: PageModelType['id']): BlockElementType => ({
	order,
	id: PLACEHOLDER_BLOCK_ID,
	type: 'placeholder',
	properties: { name: '', textColor: '', backgroundColor: '' },
	isFocusable: false,
	pageId,
	createdAt: new Date(),
	modifiedAt: new Date(),
});
