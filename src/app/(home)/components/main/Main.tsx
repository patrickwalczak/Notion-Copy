import React from 'react';
import styles from './styles.module.scss';
import Hero from '../hero/Hero';

const Main = () => {
	return (
		<main className={styles.main}>
			<Hero />
		</main>
	);
};

export default Main;
