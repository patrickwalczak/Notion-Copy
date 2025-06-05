import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const GetNotionLink = () => {
	return (
		<Link
			href={'/'}
			className={`${styles.link} rounded p-x-075 p-y-025 font-500 text-white`}
			data-css-is-active={false}
		>
			Get Notion Free
		</Link>
	);
};

export default GetNotionLink;
