import { BlockTypesType } from '@/types/block';
import { PageTypesType } from '@/types/page';

export type FocusableBlockTypesUnion = 'pageName' | PageTypesType | BlockTypesType;

export type FocusableBlockType = {
	type: FocusableBlockTypesUnion;
	element: HTMLElement;
	order?: number;
	id: string;
};

export type FocusableBlockMapType = Map<string, FocusableBlockType>;
