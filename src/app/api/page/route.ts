import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';

export async function deletePageAndDescendants(pageId: string, userId: string) {
	const toDeletePageIds: string[] = [];

	async function collectPageIds(id: string) {
		toDeletePageIds.push(id);

		const subpages = await prisma.page.findMany({
			where: { parentId: id, userId },
			select: { id: true },
		});

		for (const sub of subpages) {
			await collectPageIds(sub.id);
		}
	}

	await collectPageIds(pageId);

	await prisma.block.deleteMany({
		where: {
			pageId: {
				in: toDeletePageIds,
			},
		},
	});

	await prisma.page.deleteMany({
		where: {
			id: {
				in: toDeletePageIds,
			},
			userId,
		},
	});

	return { deletedPageIds: toDeletePageIds };
}

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
	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	let pageId: string;
	try {
		const body = await req.json();
		pageId = body.pageId;
	} catch {
		return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
	}

	if (!pageId) {
		return NextResponse.json({ error: 'Missing pageId' }, { status: 400 });
	}

	try {
		const result = await deletePageAndDescendants(pageId, userId);

		return NextResponse.json({
			success: true,
			deletedPageIds: result.deletedPageIds,
		});
	} catch (err) {
		console.error('[API:DELETE /api/page]', err);
		return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
	}
}
