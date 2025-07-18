import { BlockTypesType } from '@/types/block';
import { PageTypesType } from '@/types/page';

export type BlockTypesUnion = 'pageName' | PageTypesType | BlockTypesType;

export type BlockRefType = {
	type: BlockTypesUnion;
	element: HTMLElement;
	isFocusable: boolean;
	order: number;
	id: string;
};

export type BlockMapType = Map<string, BlockRefType>;
