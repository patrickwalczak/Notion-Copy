'use server';

import { createClient } from '../../db/supabase/server';
import prisma from '../../db/prisma/prisma';
import { notFound, redirect } from 'next/navigation';
import { PageModelType } from '@/types/page';
import { PagePropertiesSchema } from '@/schemas/page';
import { basePageSelect } from './select';

export async function getPages(): Promise<PageModelType[]> {
	const supabase = await createClient();

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (error || !user) {
		return redirect('/login');
	}

	const pages = (
		await prisma.page.findMany({
			where: { userId: user.id },
			orderBy: { order: 'asc' },
			select: {
				...basePageSelect,
				parentId: true,
			},
		})
	).map((page) => ({
		...page,
		properties: PagePropertiesSchema.parse(page.properties),
	}));

	if (!pages) return notFound();

	return pages;
}
