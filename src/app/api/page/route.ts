import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';

export async function GET() {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const userId = session?.user?.id;
	if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	try {
		const pages = await prisma.page.findMany({
			where: { userId, parentId: null },
			orderBy: { order: 'asc' },
			include: { subpages: true },
		});

		return NextResponse.json(pages);
	} catch (err) {
		console.error('[API:GET /api/page]', err);
		return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
	}
}

export async function POST(req: Request) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const userId = session?.user?.id;
	if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { action, payload } = await req.json();

	try {
		switch (action) {
			case 'rename': {
				const { pageId, name } = payload;
				if (!pageId) {
					return NextResponse.json({ error: 'Missing data' }, { status: 400 });
				}
				await prisma.page.updateMany({
					where: { id: pageId, userId },
					data: { properties: { name: name || '' } },
				});
				return NextResponse.json({ success: true });
			}

			// Add more cases as needed

			default:
				return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
		}
	} catch (err) {
		console.error(`[API:POST /api/page] action: ${action}`, err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	const userId = session?.user?.id;
	if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

	const { searchParams } = new URL(req.url);
	const pageId = searchParams.get('pageId');

	if (!pageId) {
		return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
	}

	try {
		await prisma.page.deleteMany({
			where: { id: pageId, userId },
		});

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('[API:DELETE /api/page]', err);
		return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
	}
}
