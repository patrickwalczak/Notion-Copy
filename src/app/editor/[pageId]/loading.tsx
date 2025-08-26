import React from 'react';

import styles from './styles.module.scss';
import { mergeClasses } from '@/lib/utils/mergeClasses';

const PageLoader = () => {
	return (
		<div className={mergeClasses('flex-grow-1', styles.wrapper)} aria-busy="true" aria-describedby="organizer-loading">
			<p id="organizer-loading" className={'sr-only'}>
				Loading organizer…
			</p>
			<header className={mergeClasses(styles.header, 'flex align-center justify-between gap-1 p-x-075 p-y-050')}>
				<div className={styles.headerTitle}></div>
				<div className={styles.headerActions}></div>
			</header>
			<main className={styles.container}>
				<section className={mergeClasses(styles.content, 'flex flex-column gap-050')}>
					<div className={'p-075'}>
						<div className={styles.pageTitle} />
					</div>

					<ul className={(styles.list, 'flex flex-column gap-025')}>
						{Array.from({ length: 6 }).map((_, i) => (
							<li key={i} className={styles.row}>
								<span className={mergeClasses(styles.line)} aria-hidden="true" />
							</li>
						))}
					</ul>
				</section>
			</main>
		</div>
	);
};

export default PageLoader;
