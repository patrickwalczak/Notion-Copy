import React from 'react';
import Navigation from '../../../components/auth/navigation/Navigation';
import '../../(home)/index.scss';
import Form from '../../../components/auth/form/Form';
import PageContainer from '@/components/auth/pageContainer/PageContainer';

const LoginPage = () => {
	return (
		<PageContainer>
			<Navigation />
			<Form isLogin action={'/login'} />
		</PageContainer>
	);
};

export default LoginPage;
