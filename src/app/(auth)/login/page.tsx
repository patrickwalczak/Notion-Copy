import React from 'react';
import { logIn } from '@/lib/actions/auth';
import AuthPage from '../components/AuthPage';

const defaultValues = {
	email: 'user@example.com',
	password: 'test1234',
};

const LoginPage = () => {
	return <AuthPage isLogin action={logIn} defaultValues={defaultValues} />;
};

export default LoginPage;
