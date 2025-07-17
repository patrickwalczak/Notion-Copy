import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';

export async function POST(req: Request) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const userId = session?.user?.id;
	if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const { pageId, prevBlockId, nextBlockId } = await req.json();

		if (!pageId) {
			return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
		}

		let order: number;

		const prev = prevBlockId ? await prisma.block.findUnique({ where: { id: prevBlockId } }) : null;

		const next = nextBlockId ? await prisma.block.findUnique({ where: { id: nextBlockId } }) : null;

		if (prev && next) {
			order = (prev.order + next.order) / 2;
		} else if (!prev && next) {
			order = next.order - 1;
		} else if (prev && !next) {
			order = prev.order + 1;
		} else {
			const last = await prisma.block.findFirst({
				where: { pageId },
				orderBy: { order: 'desc' },
			});
			order = (last?.order ?? 0) + 1;
		}

		const newBlock = await prisma.block.create({
			data: {
				pageId,
				type: 'text',
				order,
				properties: { name: '', textColor: '', backgroundColor: '' },
			},
		});

		return NextResponse.json(newBlock);
	} catch (err) {
		console.error('[API:POST /api/block]', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
