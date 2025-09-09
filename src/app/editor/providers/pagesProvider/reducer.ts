import { PagesReducerActionsType, PagesReducerState } from './types';
import { BlockElementType } from '@/types/block';
import { addPageRecursively, removePageAndReturnDeleted, updatePageNameRecursively } from './utils';
import { PageWithElements } from '@/types/page';
import { PLACEHOLDER_BLOCK_ID } from '../../[pageId]/constants';

function mergeByOrder<A extends { order: number }, B extends { order: number }>(a: A[], b: B[]): (A | B)[] {
	const result: (A | B)[] = [];
	let i = 0,
		j = 0;

	while (i < a.length && j < b.length) {
		if (a[i].order <= b[j].order) {
			result.push(a[i++]);
		} else {
			result.push(b[j++]);
		}
	}

	return result.concat(a.slice(i)).concat(b.slice(j));
}

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

			const newState = {
				...state,
				page: {
					...rest,
					elements: mergeByOrder(blocks, subpages),
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

			const pages = updatePageNameRecursively(state.pages, pageId, newName);

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
			} as BlockElementType;

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

			const elements = [...state.page.elements];

			const insertIndex = elements.findIndex((el) => block.order < el.order);

			if (insertIndex === -1) {
				elements.push(block);
			} else {
				elements.splice(insertIndex, 0, block);
			}

			return {
				...state,
				page: {
					...state.page,
					elements,
				},
			};
		}

		case 'insertBlock': {
			const { block: realBlock } = action.payload;

			if (!state.page) return state;

			const elements = state.page.elements;

			const idx = elements.findIndex((el) => el.id === PLACEHOLDER_BLOCK_ID);

			if (idx === -1) return state;

			const newElements = [...elements];
			newElements[idx] = realBlock;

			return {
				...state,
				page: {
					...state.page,
					elements: newElements,
				},
			};
		}

		case 'deleteBlock': {
			const { blockId } = action.payload;

			if (!state.page) return state;

			const elements = state.page.elements.filter((el) => el.id !== blockId);

			return { ...state, page: { ...state.page, elements } };
		}

		case 'addPage': {
			const { parentId, newSubpage } = action.payload;

			if (!parentId) {
				return {
					...state,
					pages: [...state.pages, newSubpage],
				};
			}

			return {
				...state,
				pages: addPageRecursively(state.pages, parentId, newSubpage),
			};
		}

		case 'removePage': {
			const { pageId } = action.payload;
			const { updatedPages, removedPage } = removePageAndReturnDeleted(state.pages, pageId);

			let page = state.page;

			if (page?.id === pageId) {
				page = null;
			} else if (page && removedPage?.parentId === page.id) {
				page = {
					...page,
					elements: page.elements.filter((el) => el.id !== removedPage.id),
				};
			}

			return {
				...state,
				pages: updatedPages,
				page,
				removedPage,
			};
		}

		case 'restorePage': {
			const { pageId } = action.payload;

			const restoredPages = addPageRecursively(state.pages, pageId, state.removedPage as PageWithElements);

			return {
				...state,
				pages: restoredPages,
			};
		}

		default:
			return state;
	}
};
