'use server';

import prisma from '@/lib/db/prisma/prisma';

export async function getPage(pageId: string): Promise<unknown> {
	try {
		const page = await prisma.page.findUnique({
			where: { id: pageId },
			include: {
				subpages: {
					orderBy: { order: 'asc' },
				},
				blocks: {
					orderBy: { order: 'asc' },
				},
			},
		});

		if (!page) return null;

		return {
			...page,
			subpages: page.subpages ?? [],
			blocks: page.blocks ?? [],
		};
	} catch (err) {
		console.error('[fetchPageById]', err);
		throw new Error('Failed to fetch page');
	}
}
