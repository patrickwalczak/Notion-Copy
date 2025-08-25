'use client';

import Form from '@/components/auth/form/Form';
import Navigation from '@/components/auth/navigation/Navigation';
import PageContainer from '@/components/auth/pageContainer/PageContainer';
import { AuthFormSchema } from '@/lib/validation/auth';
import { AuthResult, AuthStateType } from '@/types/auth';
import React, { useActionState } from 'react';
import { initialFormState } from '../initialFormState';

const AuthPage = ({
	isLogin = false,
	action,
	defaultValues = {},
}: {
	isLogin?: boolean;
	action: (formData: FormData) => Promise<AuthResult | void>;
	defaultValues?: { email?: string; password?: string };
}) => {
	const [state, formAction, isPending] = useActionState<AuthStateType, FormData>(async (prevState, formData) => {
		const parsed = AuthFormSchema.safeParse({
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

		const result = await action(formData);

		return {
			...prevState,
			...result,
			errors: undefined,
		};
	}, initialFormState);

	return (
		<PageContainer>
			<Navigation />
			<Form
				isLogin={isLogin}
				defaultValues={defaultValues}
				action={formAction}
				errors={state.errors}
				isPending={isPending}
			/>
		</PageContainer>
	);
};

export default AuthPage;
