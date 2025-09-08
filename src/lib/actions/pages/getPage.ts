'use server';

import prisma from '@/lib/db/prisma/prisma';
import { notFound } from 'next/navigation';
import { basePageSelect } from './select';
import { PageWithBlocksAndSubpages } from '@/types/page';
import { parseBlockProperties } from '@/schemas/block';
import { PagePropertiesSchema } from '@/schemas/page';

export async function getPage(pageId: string): Promise<PageWithBlocksAndSubpages> {
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

		const adjustedPage = {
			...page,
			properties: PagePropertiesSchema.parse(page.properties),
			blocks: page.blocks.map((block) => ({
				...block,
				properties: parseBlockProperties(block.type, block.properties),
			})),
			subpages: page.subpages.map((subpage) => ({
				...subpage,
				properties: PagePropertiesSchema.parse(subpage.properties),
			})),
		};

		return adjustedPage;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		notFound();
	}
}
