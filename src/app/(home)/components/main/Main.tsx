import React from 'react';
import styles from './styles.module.scss';
import Hero from '../hero/Hero';
import TrustedBy from '../trustedBy/TrustedBy';
import Features from '../features/Features';

const Main = () => {
	return (
		<main className={`${styles.main}`}>
			<div className={`${styles.mainContent} flex-column`}>
				<div className={`${styles.sections} flex-column`}>
					<Hero />
					<TrustedBy />
					<Features />
				</div>
			</div>
		</main>
	);
};

export default Main;
