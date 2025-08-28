'use server';

import { cookies } from 'next/headers';

export async function setNavigationCookies({ isOpen, isLocked }: { isOpen?: boolean; isLocked?: boolean }) {
	if (isOpen) {
		(await cookies()).set('isNavigationOpen', String(isOpen), {
			httpOnly: false,
			sameSite: 'lax',
			path: '/',
		});
	}
	if (isLocked) {
		(await cookies()).set('isNavigationLocked', String(isLocked), {
			httpOnly: false,
			sameSite: 'lax',
			path: '/',
		});
	}
}

export async function getNavigationCookies() {
	const cookieStore = await cookies();

	const isNavigationOpen = cookieStore.get('isNavigationOpen')?.value === 'true' ? true : false;
	const isNavigationLocked = cookieStore.get('isNavigationLocked')?.value === 'true' ? true : false;

	return { isNavigationOpen, isNavigationLocked };
}
