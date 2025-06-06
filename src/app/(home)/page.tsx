import Navigation from '@/app/(home)/components/navigation/Navigation';
import React, { Fragment } from 'react';
import './index.scss';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';

const Homepage = () => {
	return (
		<Fragment>
			<Navigation />
			<Main />
			{/* <Footer /> */}
		</Fragment>
	);
};

export default Homepage;
