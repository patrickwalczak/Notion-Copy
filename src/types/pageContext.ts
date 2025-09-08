import { BlocksUnionType } from '@/types/block';
import { PageModelUnionTypes } from '@/types/page';

type BlockTypesUnion = 'pageName' | PageModelUnionTypes | BlocksUnionType;

export type BlockRefType = {
	type: BlockTypesUnion;
	element: HTMLElement;
	isFocusable: boolean;
	order: number;
	id: string;
};

export type BlockMapType = Map<string, BlockRefType>;
