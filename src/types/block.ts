import { BLOCK_TYPES } from '@/app/editor/[pageId]/utils/blocks';
import { PLACEHOLDER_ELEMENT_OPERATIONS, TEXT_ELEMENT_OPERATIONS } from '@/app/editor/[pageId]/utils/operations';
import { TextBlockPropertiesSchema } from '@/schemas/block';
import z from 'zod';

export type BlocksUnionType = (typeof BLOCK_TYPES)[number];

export type TextElementOperationsType = (typeof TEXT_ELEMENT_OPERATIONS)[number];

export type PlaceholderElementOperationsType = (typeof PLACEHOLDER_ELEMENT_OPERATIONS)[number];

export type BlockElementsOperations = TextElementOperationsType | PlaceholderElementOperationsType;

export type TextBlockPropertiesType = z.infer<typeof TextBlockPropertiesSchema>;

export type BlocksPropertiesType = TextBlockPropertiesType;

export type OptionalBlocksPropertiesType = Partial<BlocksPropertiesType>;

export interface BlockElementType {
	id: string;
	createdAt: Date;
	modifiedAt: Date;
	order: number;
	isFocusable: boolean;
	pageId: string;
	type: BlocksUnionType;
	properties: BlocksPropertiesType;
}
