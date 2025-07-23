import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	// Create the base response
	const response = NextResponse.next({ request });

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => request.cookies.getAll(),
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						response.cookies.set(name, value, options);
					});
				},
			},
		}
	);

	// MUST call this to keep session alive
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	if (!user && pathname.startsWith('/editor')) {
		const loginUrl = request.nextUrl.clone();
		loginUrl.pathname = '/login';
		loginUrl.searchParams.set('redirectedFrom', pathname);
		return NextResponse.redirect(loginUrl);
	}

	return response;
}
