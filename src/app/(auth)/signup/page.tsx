'use client';

import React from 'react';
import '../../(home)/index.scss';
import { signUp } from '@/actions/auth';
import AuthPage from '../components/AuthPage';

const SignUpPage = () => {
	return <AuthPage action={signUp} />;
};

export default SignUpPage;
