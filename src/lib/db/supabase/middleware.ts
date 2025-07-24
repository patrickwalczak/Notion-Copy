import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
	const response = NextResponse.next();

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

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const pathname = request.nextUrl.pathname;

	if (!user && pathname.startsWith('/editor')) {
		const loginUrl = request.nextUrl.clone();
		loginUrl.pathname = '/login';
		return NextResponse.redirect(loginUrl);
	}

	const authPages = ['/', '/login', '/signup'];
	if (user && authPages.includes(pathname)) {
		const editorUrl = request.nextUrl.clone();
		editorUrl.pathname = '/editor';
		return NextResponse.redirect(editorUrl);
	}

	return response;
}
