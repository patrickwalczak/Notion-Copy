'use client';

import React, { useActionState } from 'react';
import Navigation from '../../../components/auth/navigation/Navigation';
import '../../(home)/index.scss';
import Form from '../../../components/auth/form/Form';
import PageContainer from '@/components/auth/pageContainer/PageContainer';
import { logIn } from '@/actions/auth';

const initialState = {
	email: '',
	password: '',
};

const LoginPage = () => {
	const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
		try {
			const result = await logIn(formData);

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
			<Form isLogin action={formAction} />
		</PageContainer>
	);
};

export default LoginPage;
