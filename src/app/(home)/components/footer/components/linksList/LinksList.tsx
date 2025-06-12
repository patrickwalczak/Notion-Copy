import React, { ReactNode } from 'react';
import styles from './styles.module.scss';

export const LinksList = ({ children, listLabel }: { children: ReactNode; listLabel: string }) => {
	return (
		<ul className={`${styles.list} flex-column`} role="list">
			<li role="none">
				<p className={`${styles.listLabel}`}>{listLabel}</p>
			</li>
			{children}
		</ul>
	);
};
