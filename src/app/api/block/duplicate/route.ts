import { NextResponse } from 'next/server';
import { getElementOrder } from '@/lib/utils/getElementOrder';
import { createClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma/prisma';
import { DuplicateBlockPayloadType } from '@/types/functions.models';

export async function POST(req: Request) {
	const supabase = await createClient();
	const {
		data: { session },
		error,
	} = await supabase.auth.getSession();

	if (!session || error) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { pageId, prevOrder, nextOrder, blockId } = (await req.json()) as DuplicateBlockPayloadType;

		const source = await prisma.block.findUnique({
			where: { id: blockId },
		});

		if (!source) {
			return NextResponse.json({ error: 'Block not found' }, { status: 404 });
		}

		const order = getElementOrder(prevOrder, nextOrder);

		const newBlock = await prisma.block.create({
			data: {
				pageId: pageId ?? source.pageId,
				type: source.type,
				order,
				properties: JSON.parse(JSON.stringify(source.properties ?? {})),
				isFocusable: source.isFocusable,
			},
		});

		return NextResponse.json(newBlock, { status: 201 });
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (err) {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
