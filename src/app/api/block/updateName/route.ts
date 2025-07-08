import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const user = session?.user;
	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await req.json();
	const { blockId, name } = body;

	if (!blockId || !name) {
		return NextResponse.json({ error: 'Missing blockId or name' }, { status: 400 });
	}

	try {
		const updated = await prisma.block.updateMany({
			where: {
				id: blockId,
				page: {
					userId: user.id,
				},
			},
			data: {
				properties: {
					name,
				},
			},
		});

		if (updated.count === 0) {
			return NextResponse.json({ error: 'Block not found or not owned by user' }, { status: 404 });
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
