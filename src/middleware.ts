import { type NextRequest } from 'next/server';
import { updateSession } from './lib/db/supabase/middleware';

function detectDevice(uaRaw: string, chm: string | null): 'mobile' | 'tablet' | 'desktop' {
	const ua = uaRaw.toLowerCase();

	if (chm === '?1') return 'mobile';
	const isTablet = /ipad/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua));
	if (isTablet) return 'tablet';
	const isPhone = /iphone|ipod|windows phone/.test(ua) || (/android/.test(ua) && /mobile/.test(ua));
	return isPhone ? 'mobile' : 'desktop';
}

export async function middleware(request: NextRequest) {
	const response = await updateSession(request);

	const device = detectDevice(request.headers.get('user-agent') || '', request.headers.get('sec-ch-ua-mobile'));
	response.cookies.set('device', device);

	return response;
}

export const config = {
	matcher: ['/', '/login', '/signup', '/editor/:path*'],
};
