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
		const { parentId, prevBlockId, nextBlockId } = await req.json();

		let order = 0;

		if (prevBlockId && nextBlockId) {
			const [prevBlock, nextBlock] = await Promise.all([
				prisma.block.findUnique({ where: { id: prevBlockId } }),
				prisma.block.findUnique({ where: { id: nextBlockId } }),
			]);

			if (prevBlock && nextBlock) {
				order = (prevBlock.order + nextBlock.order) / 2;
			} else if (prevBlock) {
				order = prevBlock.order + 1;
			} else if (nextBlock) {
				order = nextBlock.order - 1;
			}
		} else if (prevBlockId) {
			const prevBlock = await prisma.block.findUnique({ where: { id: prevBlockId } });
			order = prevBlock ? prevBlock.order + 1 : 0;
		} else if (nextBlockId) {
			const nextBlock = await prisma.block.findUnique({ where: { id: nextBlockId } });
			order = nextBlock ? nextBlock.order - 1 : 0;
		} else if (parentId) {
			const lastBlock = await prisma.block.findFirst({
				where: { pageId: parentId },
				orderBy: { order: 'desc' },
			});
			order = (lastBlock?.order ?? -1) + 1;
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
