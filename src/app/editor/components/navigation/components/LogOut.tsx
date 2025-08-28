'use client';

import { logOut } from '@/lib/actions/auth';

export default function LogOut() {
	return (
		<form action={logOut}>
			<button className="logOut-btn nav-element flex align-center gap-050 bg-transition bg-hover" type="submit">
				Log out
			</button>
		</form>
	);
}
