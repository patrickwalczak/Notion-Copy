import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';

const PageBlock = ({ page }) => {
	return (
		<Link onClick={(e) => e.stopPropagation()} className={`${styles.link} p-y-025`} href={page.id}>
			{page.properties.name || NO_TITLE_PLACEHOLDER}
		</Link>
	);
};

export default PageBlock;
