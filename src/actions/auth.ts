'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/db/supabase/server';
import { AuthFormSchema } from '@/lib/validation/auth';
import { AuthResult } from '@/types/auth';

export async function logIn(formData: FormData): Promise<AuthResult | void> {
	const parsed = AuthFormSchema.safeParse({
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

export async function signUp(formData: FormData): Promise<AuthResult | void> {
	const parsed = AuthFormSchema.safeParse({
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

	const response = await supabase.auth.signUp(parsed.data);

	if (response?.data?.user) {
		return redirect(`/editor`);
	}
}

export async function logOut() {
	const supabase = await createClient();

	await supabase.auth.signOut();

	return redirect('/login');
}
