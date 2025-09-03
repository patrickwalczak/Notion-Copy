'use server';

import prisma from '@/lib/db/prisma/prisma';
import { notFound } from 'next/navigation';
import { basePageSelect } from './select';
import { PageModelType } from '@/types/page';
import { BlockBaseType } from '@/types/block';
import { parseBlockProperties } from '@/schemas/block';

type Page = PageModelType & { subpages: PageModelType[]; blocks: BlockBaseType[] };

export async function getPage(pageId: string): Promise<Page> {
	try {
		const page = await prisma.page.findUnique({
			where: { id: pageId },
			select: {
				subpages: {
					orderBy: { order: 'asc' },
					select: basePageSelect,
				},
				blocks: {
					orderBy: { order: 'asc' },
					select: {
						id: true,
						order: true,
						isFocusable: true,
						createdAt: true,
						modifiedAt: true,
						type: true,
						properties: true,
						pageId: true,
					},
				},
				...basePageSelect,
				parentId: true,
			},
		});

		if (!page) throw new Error('Page not found');

		return {
			...page,
			blocks: page.blocks.map((block) => ({
				...block,
				properties: parseBlockProperties(block.type, block.properties),
			})),
		};
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		notFound();
	}
}

const x = {
	subpages: [],
	blocks: [
		{
			id: 'cmeuapwh60003lwwgutsode2j',
			order: 2,
			isFocusable: true,
			createdAt: '2025-08-27T18:15:52.746Z',
			modifiedAt: '2025-09-03T08:24:40.992Z',
			type: 'text',
			properties: {
				name: 'block232',
			},
			pageId: 'cmdisfdo60001lw6kwy6wmwq1',
		},
		{
			id: 'cmeuapxmb0005lwwgw5ckwe72',
			order: 3,
			isFocusable: true,
			createdAt: '2025-08-27T18:15:54.228Z',
			modifiedAt: '2025-08-27T18:15:55.458Z',
			type: 'text',
			properties: {
				name: 'block',
			},
			pageId: 'cmdisfdo60001lw6kwy6wmwq1',
		},
		{
			id: 'cmf3p00sd0001lwi80n6o0xi9',
			order: 4,
			isFocusable: true,
			createdAt: '2025-09-03T08:05:35.098Z',
			modifiedAt: '2025-09-03T08:05:35.098Z',
			type: 'text',
			properties: {
				name: '',
				textColor: '',
				backgroundColor: '',
			},
			pageId: 'cmdisfdo60001lw6kwy6wmwq1',
		},
	],
	id: 'cmdisfdo60001lw6kwy6wmwq1',
	modifiedAt: '2025-09-03T08:03:43.423Z',
	createdAt: '2025-07-25T12:18:38.454Z',
	order: 1,
	isFocusable: false,
	type: 'page',
	properties: {
		name: 'Example',
	},
	parentId: null,
};
