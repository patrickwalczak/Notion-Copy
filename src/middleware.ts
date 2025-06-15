import { type NextRequest, userAgent } from 'next/server';
import { updateSession } from './lib/db/supabase/middleware';

export async function middleware(request: NextRequest) {
	const response = await updateSession(request);

	// Set device type cookie
	const { device } = userAgent(request);
	const viewport = device.type || 'desktop';
	response.cookies.set('device', viewport);

	return response;
}
