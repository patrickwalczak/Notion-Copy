'use client';

import PageContainer from '@/components/auth/pageContainer/PageContainer';
import React, { useActionState } from 'react';
import '../../(home)/index.scss';
import Navigation from '@/components/auth/navigation/Navigation';
import Form from '@/components/auth/form/Form';
import { useRouter } from 'next/navigation';
import { signUp } from '@/actions/auth';

const initialState = {
	email: '',
	password: '',
};

const SignUpPage = () => {
	const router = useRouter();

	const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
		try {
			const result = await signUp(formData);

			return result;
		} catch (err) {
			return {
				success: false,
				message: (err as Error).message || 'An error occurred',
				errors: undefined,
			};
		}
	}, initialState);

	return (
		<PageContainer>
			<Navigation />
			<Form action={formAction} />
		</PageContainer>
	);
};

export default SignUpPage;
