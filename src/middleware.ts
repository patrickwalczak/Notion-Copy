import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const { device } = userAgent(request);
	const viewport = device.type || 'desktop';

	response.cookies.set('device', viewport);

	return response;
}
