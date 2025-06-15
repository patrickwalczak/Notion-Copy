'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/db/supabase/server';

export async function logIn(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const response = await supabase.auth.signInWithPassword(data);

	if (response?.data?.user) {
		return redirect(`/${response.data.user.id}`);
	}
}

export async function signUp(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const response = await supabase.auth.signUp(data);

	if (response?.data?.user) {
		return redirect(`/${response.data.user.id}`);
	}
}
