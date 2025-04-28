import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

const HomeLink = () => {
	return (
		<Link href="/" className={styles.link} data-css-is-active={false}>
			Home
		</Link>
	);
};

export default HomeLink;
