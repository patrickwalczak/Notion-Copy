'use client';

import React, { useActionState } from 'react';
import Navigation from '../../../components/auth/navigation/Navigation';
import Form from '../../../components/auth/form/Form';
import PageContainer from '@/components/auth/pageContainer/PageContainer';
import { logIn } from '@/actions/auth';
import { LoginSchema } from '@/lib/validation/auth';

type LoginState = {
	success: boolean;
	message: string;
	errors?: Record<string, string>;
};

const initialState: LoginState = {
	success: false,
	message: '',
	errors: undefined,
};

const defaultValues = {
	email: 'user@example.com',
	password: 'test1234',
};

const LoginPage = () => {
	const [state, formAction, isPending] = useActionState<LoginState, FormData>(async (prevState, formData) => {
		const parsed = LoginSchema.safeParse({
			email: formData.get('email'),
			password: formData.get('password'),
		});

		if (!parsed.success) {
			const fieldErrors: Record<string, string> = {};
			parsed.error.errors.forEach((err) => {
				if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
			});

			return {
				...prevState,
				success: false,
				message: 'Validation failed',
				errors: fieldErrors,
			};
		}

		const result = await logIn(formData);

		return {
			...prevState,
			...result,
			errors: undefined,
		};
	}, initialState);

	return (
		<PageContainer>
			<Navigation />
			<Form isLogin action={formAction} defaultValues={defaultValues} errors={state.errors} isPending={isPending} />
		</PageContainer>
	);
};

export default LoginPage;
