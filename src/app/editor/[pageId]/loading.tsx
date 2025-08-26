import React from 'react';

import styles from './styles.module.scss';
import { mergeClasses } from '@/lib/utils/mergeClasses';

const PageLoader = () => {
	return (
		<div
			className={mergeClasses('flex-grow-1', styles.wrapper, 'skeleton-wrapper')}
			aria-busy="true"
			aria-describedby="organizer-loading"
		>
			<p id="organizer-loading" className={'sr-only'}>
				Loading organizer…
			</p>
			<header className={mergeClasses(styles.header, 'flex align-center justify-between gap-1 p-x-075 p-y-050')}>
				<div className={mergeClasses(styles.headerTitle, 'skeleton-item')}></div>
				<div className={mergeClasses(styles.headerActions, 'skeleton-item')}></div>
			</header>
			<main className={styles.container}>
				<section className={mergeClasses(styles.content, 'flex flex-column gap-1')}>
					<div className={'p-075'}>
						<div className={mergeClasses(styles.pageTitle, 'skeleton-item')} />
					</div>

					<ul className={(styles.list, 'flex flex-column gap-075')}>
						{Array.from({ length: 6 }).map((_, i) => (
							<li key={i} className={styles.row}>
								<span className={mergeClasses(styles.line, 'skeleton-item')} aria-hidden="true" />
							</li>
						))}
					</ul>
				</section>
			</main>
		</div>
	);
};

export default PageLoader;
