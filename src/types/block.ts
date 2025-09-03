import { BLOCK_TYPES } from '@/app/editor/[pageId]/utils/blocks';
import { TEXT_ELEMENT_OPERATIONS } from '@/app/editor/[pageId]/utils/operations';
import { TextBlockPropertiesSchema } from '@/schemas/block';
import z from 'zod';

export type BlocksUnionType = (typeof BLOCK_TYPES)[number];

export type TextElementOperationsType = (typeof TEXT_ELEMENT_OPERATIONS)[number];

export type TextBlockPropertiesType = z.infer<typeof TextBlockPropertiesSchema>;

export type BlocksPropertiesType = TextBlockPropertiesType;

export interface BlockBaseType {
	id: string;
	createdAt: Date;
	modifiedAt: Date;
	order: number;
	isFocusable: boolean;
	pageId: string;
	type: BlocksUnionType;
	properties: BlocksPropertiesType;
}
