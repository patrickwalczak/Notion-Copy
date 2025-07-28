import { NextResponse } from 'next/server';
import { createClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma/prisma';

export async function POST(req: Request) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const userId = session?.user?.id;
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { parentId } = await req.json();

		if (!parentId) {
			return NextResponse.json({ error: 'Missing parentId' }, { status: 400 });
		}

		const [lastPage, lastBlock] = await Promise.all([
			prisma.page.findFirst({
				where: { parentId },
				orderBy: { order: 'desc' },
			}),
			prisma.block.findFirst({
				where: { pageId: parentId },
				orderBy: { order: 'desc' },
			}),
		]);

		const maxOrder = Math.max(lastPage?.order ?? -1, lastBlock?.order ?? -1);
		const order = maxOrder + 1;

		const newPage = await prisma.page.create({
			data: {
				userId,
				parentId,
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
		console.error('[API:POST /api/page/createSubpage]', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
