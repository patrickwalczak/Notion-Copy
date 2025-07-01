const tableParent = {
	id: 0,
	order: 0,
	name: 'Goals',
	description: '',
	icon: '',
	cover: '',
	href: '',
	type: 'tableParent',
	children: [],
	parentId: null,
	properties: {
		color: null,
		backgroundColor: null,
	},
	operations: [
		{ name: 'addToFavorites' },
		{ name: 'turnIntoInlineDatabase' },
		{ name: 'color' },
		{ name: 'editIcon' },
		{ name: 'copyLink' },
		{ name: 'lockDatabase' },
		{ name: 'move' },
		{ name: 'delete' },
		{
			name: 'duplicate',
			options: {
				0: { name: 'withContent' },
				1: { name: 'withoutContent' },
			},
		},
		{ name: 'turnInto' },
		{ name: 'rename' },
	],
};

const table = {
	id: 0,
	order: 0,
	name: null,
	type: 'table',
	children: null,
	properties: {
		columns: [
			{
				id: 0,
				order: 0,
				name: '',
				icon: '',
				width: '',
				type: 'text',
				operations: [],
				properties: {
					isVisible: true,
				},
			},
			{
				id: 0,
				order: 1,
				name: '',
				icon: '',
				width: '',
				type: 'text',
				operations: [],
				properies: {
					isVisible: true,
				},
			},
			{
				order: 2,
				name: '',
				icon: '',
				width: '',
				type: 'text',
				operations: [],
				properies: {
					isVisible: true,
				},
			},
		],
		rows: [
			{
				id: 0,
				order: 0,
				name: '',
				type: 'text',
				operations: [],
				properies: {
					icon: '',
					columnId: 0,
				},
				data: [
					{
						value: '',
					},
				],
			},
		],
		areVerticalLinesVisible: true,
		arePagesIconsVisible: true,
		areColumnsWrapped: true,
	},
	operations: [
		{ name: 'filter' },
		{ name: 'sort' },
		{ name: 'search' },
		{ name: 'delete' },
		{ name: 'turnInto' },
		{ name: 'rename' },
		{ name: 'move' },
	],
};
