'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/db/supabase/server';
import { LoginSchema } from '@/lib/validation/auth';

export async function logIn(formData: FormData) {
	const parsed = LoginSchema.safeParse({
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	});

	if (!parsed.success) {
		return {
			success: false,
			message: 'Validation failed',
			errors: parsed.error.flatten().fieldErrors,
		};
	}

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

	if (error) {
		return { success: false, message: error.message };
	}

	if (data?.user) {
		return redirect('/editor');
	}

	return { success: false, message: 'Unknown error occurred' };
}

export async function signUp(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	};

	const response = await supabase.auth.signUp(data);

	if (response?.data?.user) {
		return redirect(`/editor`);
	}
}

export async function logOut() {
	const supabase = await createClient();

	await supabase.auth.signOut();

	return redirect('/login');
}
