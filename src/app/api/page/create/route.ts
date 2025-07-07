import { NextResponse } from 'next/server';
import { createClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma/prisma';

export async function POST(req: Request) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const userId = session?.user?.id;
	if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const { parentId } = await req.json();

		// Get max order from subpages and blocks (if parentId is provided)
		let order = 0;

		if (parentId) {
			const [lastSubpage, lastBlock] = await Promise.all([
				prisma.page.findFirst({
					where: { parentId },
					orderBy: { order: 'desc' },
				}),
				prisma.block.findFirst({
					where: { pageId: parentId },
					orderBy: { order: 'desc' },
				}),
			]);

			const maxOrder = Math.max(lastSubpage?.order ?? -1, lastBlock?.order ?? -1);
			order = maxOrder + 1;
		} else {
			const lastTopPage = await prisma.page.findFirst({
				where: { parentId: null, userId },
				orderBy: { order: 'desc' },
			});
			order = (lastTopPage?.order ?? -1) + 1;
		}

		const newPage = await prisma.page.create({
			data: {
				userId,
				parentId: parentId ?? null,
				order,
				type: 'page',
				properties: {
					name: '',
					icon: '',
					cover: '',
					isSmallText: false,
					isFullWidth: false,
					isPageLocked: false,
				},
			},
			include: { subpages: true },
		});

		return NextResponse.json(newPage, { status: 201 });
	} catch (err) {
		console.error('[API:POST /api/page]', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
