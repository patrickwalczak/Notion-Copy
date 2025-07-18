import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';

export async function DELETE(req: Request) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const userId = session?.user?.id;
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { blockId } = await req.json();

		if (!blockId) {
			return NextResponse.json({ error: 'Missing blockId' }, { status: 400 });
		}

		await prisma.block.delete({
			where: {
				id: blockId,
			},
		});

		return NextResponse.json({ message: 'Block deleted successfully' });
	} catch (err) {
		console.error('[API:DELETE /api/block]', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
