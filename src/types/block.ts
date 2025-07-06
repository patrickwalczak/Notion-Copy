export type BlockTypesType = 'text' | 'h1' | 'h2' | 'h3';

export interface BlockBaseType {
	createdAt: string;
	modifiedAt: string;
	id: string;
	pageId: string;
	order: number;
	type: BlockTypesType;
	properties: Record<string, unknown>;
	operations: Record<string, unknown>[];
}

export interface TextElementPropertiesType {
	name: string | null;
	textColor: string | null;
	backgroundColor: string | null;
}

type TextElementOperationsUnionType = 'turnInto' | 'changeColor' | 'copyParentLink' | 'duplicate' | 'delete' | 'move';

export type TextElementOperationsType = Record<'name', TextElementOperationsUnionType>;

export type TextElementsType = BlockTypesType;

export interface TextElementType {
	type: TextElementsType;
	properties: TextElementPropertiesType;
	operations: TextElementOperationsType[];
}
