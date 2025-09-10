import { OptionalBlocksPropertiesType } from './block';

export type CreateDefaultBlockType = {
	pageId?: string;
	prevOrder?: number;
	nextOrder?: number;
};

export type DuplicateBlockPayloadType = CreateDefaultBlockType & { blockId: string };

export type UpdateBlockParams = {
	blockId: string;
	properties: OptionalBlocksPropertiesType;
};
