'use server';

import { createClient } from '../../db/supabase/server';
import prisma from '../../db/prisma/prisma';

export async function getPages(): Promise<unknown> {
	const supabase = await createClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const user = session?.user;
	if (!user) return [];

	return prisma.page.findMany({
		where: { userId: user.id },
		orderBy: { order: 'asc' },
	});
}
