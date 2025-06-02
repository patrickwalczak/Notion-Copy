import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const { device } = userAgent(request);
	const viewport = device.type || 'desktop';
	// const pathname = request.nextUrl.pathname;

	response.cookies.set('device', viewport);

	// if (pathname === '/') {
	// 	return NextResponse.redirect(new URL('/112233', request.url));
	// }

	return response;
}
