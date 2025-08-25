'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { useParams } from 'next/navigation';

const HomeLink = () => {
	const { pageId } = useParams();

	return (
		<Link
			href={`/editor`}
			className={`${styles.link} nav-element flex align-center bg-hover bg-transition`}
			data-css-is-active={!pageId}
		>
			Home
		</Link>
	);
};

export default HomeLink;
