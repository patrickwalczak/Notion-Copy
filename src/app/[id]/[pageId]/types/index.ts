import { BlockTypesType } from '@/types/block';
import { PageTypesType } from '@/types/page';

export type FocusableBlockTypesUnion = 'pageName' | PageTypesType | BlockTypesType;

export type FocusableBlockType = {
	type: FocusableBlockTypesUnion;
	element: HTMLElement;
	isFocusable: boolean;
	order: number;
	id: string;
};

export type BlockMapType = Map<string, FocusableBlockType>;
