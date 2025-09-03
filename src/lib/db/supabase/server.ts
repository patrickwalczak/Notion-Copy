import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
	const cookieStore = await cookies();
	const isProd = process.env.NODE_ENV === 'production';

	return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) => {
						const merged: Parameters<typeof cookieStore.set>[2] = {
							path: '/',
							sameSite: 'lax',
							secure: isProd,
							...options,
						};

						merged.httpOnly = true;
						if (String(merged.sameSite).toLowerCase() === 'none') {
							merged.secure = true;
						}

						cookieStore.set(name, value, merged);
					});
				} catch {
					// Called from a Server Component; safe to ignore if middleware refreshes sessions
				}
			},
		},
	});
}
