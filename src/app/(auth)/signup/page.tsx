import PageContainer from '@/components/auth/pageContainer/PageContainer';
import React from 'react';
import '../../(home)/index.scss';
import Navigation from '@/components/auth/navigation/Navigation';
import Form from '@/components/auth/form/Form';

const SignUpPage = () => {
	return (
		<PageContainer>
			<Navigation />
			<Form action={'/signup'} />
		</PageContainer>
	);
};

export default SignUpPage;
