'use client';

import { logOut } from '@/actions/auth';

export default function LogOut() {
	return (
		<form action={logOut}>
			<button type="submit">Log out</button>
		</form>
	);
}
