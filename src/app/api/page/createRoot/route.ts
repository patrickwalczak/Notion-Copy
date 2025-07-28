import { NextResponse } from 'next/server';
import { createClient } from '@/lib/db/supabase/server';
import prisma from '@/lib/db/prisma/prisma';

/**
 * @route POST /api/page/create-root
 * @desc Creates a new root-level page (no parent).
 * @access Authenticated users only
 *
 * @requestBody
 * {
 *   "lastOrder": number  // The order value of the last root page, or -1 if none exist
 * }
 *
 * @response
 * 201 Created
 * {
 *   "id": string,
 *   "order": number,
 *   "parentId": null,
 *   "properties": { ... }
 * }
 *
 * @error
 * 401 Unauthorized – if user is not authenticated
 * 400 Bad Request – if lastOrder is missing or invalid
 * 500 Internal Server Error – on failure
 */

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
		const { lastOrder } = await req.json();

		if (typeof lastOrder !== 'number') {
			return NextResponse.json({ error: 'Missing or invalid lastOrder' }, { status: 400 });
		}

		const order = lastOrder + 1;

		const newPage = await prisma.page.create({
			data: {
				userId,
				parentId: null,
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
		console.error('[API:POST /api/page/create-root]', err);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
