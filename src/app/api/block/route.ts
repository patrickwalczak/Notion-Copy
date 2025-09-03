import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';

export async function DELETE(req: Request) {
	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	let payload: unknown;
	try {
		payload = await req.json();
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
	}

	const blockId = (payload as { blockId?: string })?.blockId;

	if (!blockId) {
		return NextResponse.json({ error: 'Missing blockId' }, { status: 400 });
	}

	try {
		const block = await prisma.block.findUnique({
			where: { id: blockId },
			select: { id: true },
		});
		if (!block) {
			return NextResponse.json({ error: 'Not found' }, { status: 404 });
		}

		await prisma.block.delete({ where: { id: blockId } });

		return new NextResponse(null, { status: 204 });
	} catch (err) {
		console.error('[API:DELETE /api/block]', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
