import prisma from '@/lib/db/prisma/prisma';
import { createClient } from '@/lib/db/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

import { Prisma } from '@prisma/client';
import { UpdateBlockParams } from '@/types/functions.models';

function toJsonObject(v: unknown): Prisma.JsonObject {
	if (v && typeof v === 'object' && !Array.isArray(v)) return v as Prisma.JsonObject;
	return {};
}

export async function PATCH(req: NextRequest) {
	try {
		const supabase = await createClient();
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();

		const user = session?.user;

		if (!user || error) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await req.json();

		const { blockId, properties } = body as UpdateBlockParams;

		if (!blockId || !properties) {
			return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
		}

		const block = await prisma.block.findFirst({
			where: { id: blockId, page: { userId: user.id } },
			select: { properties: true },
		});

		if (!block) {
			return NextResponse.json({ error: 'Block not found or not owned by user' }, { status: 404 });
		}

		const blockProperties = toJsonObject(block.properties);

		await prisma.block.update({
			where: { id: blockId },
			data: {
				properties: { ...blockProperties, ...properties },
			},
		});

		return NextResponse.json({ success: true });
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
