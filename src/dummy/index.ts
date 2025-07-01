import { PageElementType } from '@/types';

export const createPageInDb = async (page) => dummyFetch(page);

const dummyFetch = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 500));

export const getPage = (id) =>
	new Promise((resolve) => setTimeout(() => resolve(dummyPages.find((page) => page.id === id)), 1000));

export const getPages = () => new Promise((resolve) => setTimeout(() => resolve(dummyPages), 100));

export const dummyPages: PageElementType[] = [
	{
		createdAt: '2025-05-01',
		modifiedAt: '2025-05-01',
		id: 1,
		parentId: null,
		type: 'page',
		order: 0,
		href: '',
		properties: {
			name: 'Roadmap',
			icon: '',
			cover: '',
			isSmallText: false,
			isFullWidth: false,
			isPageLocked: false,
		},
		children: [],
		operations: [
			{ name: 'copyLink' },
			{ name: 'duplicate' },
			{ name: 'delete' },
			{ name: 'rename' },
			{ name: 'move' },
			{ name: 'addToFavorites' },
			{ name: 'undo' },
			{ name: 'export' },
			{ name: 'import' },
			{ name: 'lockPage' },
		],
	},
	{
		createdAt: '2025-05-02',
		modifiedAt: '2025-05-03',
		id: 2,
		parentId: null,
		type: 'page',
		order: 1,
		href: '',
		properties: {
			name: 'Journal',
			icon: '',
			cover: '',
			isSmallText: false,
			isFullWidth: false,
			isPageLocked: false,
		},
		children: [],
		operations: [
			{ name: 'copyLink' },
			{ name: 'duplicate' },
			{ name: 'delete' },
			{ name: 'rename' },
			{ name: 'move' },
			{ name: 'addToFavorites' },
			{ name: 'undo' },
			{ name: 'export' },
			{ name: 'import' },
			{ name: 'lockPage' },
		],
	},
	{
		createdAt: '2025-05-04',
		modifiedAt: '2025-05-06',
		id: 3,
		parentId: null,
		type: 'page',
		order: 2,
		href: '',
		properties: {
			name: 'Ideas',
			icon: '',
			cover: '',
			isSmallText: false,
			isFullWidth: false,
			isPageLocked: false,
		},
		children: [],
		operations: [
			{ name: 'copyLink' },
			{ name: 'duplicate' },
			{ name: 'delete' },
			{ name: 'rename' },
			{ name: 'move' },
			{ name: 'addToFavorites' },
			{ name: 'undo' },
			{ name: 'export' },
			{ name: 'import' },
			{ name: 'lockPage' },
		],
	},
];
