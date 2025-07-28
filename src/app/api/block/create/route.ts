import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';

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
		const { pageId, prevOrder, nextOrder } = await req.json();

		if (!pageId) {
			return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
		}

		let order: number;

		if (typeof prevOrder === 'number' && typeof nextOrder === 'number') {
			order = (prevOrder + nextOrder) / 2;
		} else if (typeof prevOrder === 'number') {
			order = prevOrder + 1;
		} else if (typeof nextOrder === 'number') {
			order = nextOrder - 1;
		} else {
			const [lastPage, lastBlock] = await Promise.all([
				prisma.page.findFirst({
					where: { parentId: pageId },
					orderBy: { order: 'desc' },
					select: { order: true },
				}),
				prisma.block.findFirst({
					where: { pageId },
					orderBy: { order: 'desc' },
					select: { order: true },
				}),
			]);

			order = Math.max(lastPage?.order ?? -1, lastBlock?.order ?? -1) + 1;
		}

		const newBlock = await prisma.block.create({
			data: {
				pageId,
				type: 'text',
				order,
				properties: {
					name: '',
					textColor: '',
					backgroundColor: '',
				},
				isFocusable: true,
			},
		});

		return NextResponse.json(newBlock, { status: 201 });
	} catch (err) {
		console.error('[API:POST /api/block]', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
