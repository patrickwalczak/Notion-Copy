import { PageEntityType } from '@/types/page';
import { PagesReducerActionsType, PagesReducerState } from './types';
import { BlockBaseType } from '@/types/block';

export const reducer = (state: PagesReducerState, action: PagesReducerActionsType): PagesReducerState => {
	switch (action.type) {
		case 'setPage': {
			const { page } = action.payload;

			if (!page)
				return {
					...state,
					page: null,
				};

			const { blocks, subpages, ...rest } = page;

			const elements = [...subpages, ...blocks].sort((a, b) => a.order - b.order);

			const newState = {
				...state,
				page: {
					...rest,
					elements,
				},
			};

			return newState;
		}

		case 'renamePage': {
			const { pageId, newName } = action.payload;

			if (!state.page || !pageId) return state;

			const page =
				state.page.id === pageId
					? {
							...state.page,
							properties: {
								...state.page.properties,
								name: newName,
							},
					  }
					: state.page;

			const index = state.pages.findIndex((p) => p.id === pageId);

			const pages =
				index !== -1
					? state.pages.with(index, {
							...state.pages[index],
							properties: {
								...state.pages[index].properties,
								name: newName,
							},
					  })
					: state.pages;

			return { ...state, page, pages };
		}

		case 'updateBlockName': {
			const { blockId, newName } = action.payload;

			if (!state.page) return state;

			const index = state.page?.elements.findIndex((block) => block.id === blockId);

			if (index === -1) return state;

			const updatedBlock = {
				...state.page.elements[index],
				properties: {
					...state.page.elements[index].properties,
					name: newName,
				},
			} as BlockBaseType;

			return {
				...state,
				page: {
					...state.page,
					elements: state.page.elements.with(index, updatedBlock),
				},
			};
		}

		case 'createDefaultBlock': {
			const { block } = action.payload;

			if (!state.page) return state;

			const insertIndex = state.page.elements.findIndex((el) => block.order < el.order);

			let elements: typeof state.page.elements;

			if (insertIndex === -1) {
				elements = [...state.page.elements, block];
			} else {
				elements = [...state.page.elements.slice(0, insertIndex), block, ...state.page.elements.slice(insertIndex)];
			}

			return {
				...state,
				page: {
					...state.page,
					elements,
				},
			};
		}

		case 'deleteBlock': {
			const { blockId } = action.payload;

			if (!state.page) return state;

			const elements = state.page.elements.filter((el) => el.id !== blockId);

			return { ...state, page: { ...state.page, elements } };
		}

		case 'addSubpage': {
			const { parentId, newSubpage } = action.payload;

			const addToParent = (pages: PageEntityType[]): PageEntityType[] => {
				return pages.map((page) => {
					if (page.id === parentId) {
						return {
							...page,
							subpages: [...page.subpages, newSubpage],
						};
					}

					if (page.subpages?.length) {
						return {
							...page,
							subpages: addToParent(page.subpages),
						};
					}

					return page;
				});
			};

			return {
				...state,
				pages: addToParent(state.pages),
			};
		}

		default:
			return state;
	}
};
