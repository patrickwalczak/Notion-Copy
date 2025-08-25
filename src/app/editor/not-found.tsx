'use client';

import Logo from '@/components/SVGs/Logo';
import styles from './notFound.module.scss';
import Link from 'next/link';

export default function NotFound() {
	return (
		<div className={`${styles.wrapper} flex-center`}>
			<div className={`${styles.container} flex flex-column p-x-1`}>
				<header className={`${styles.header} flex align-center gap-050`}>
					<Logo />
					<h1 className={styles.title}>Notion</h1>
				</header>
				<main className={`${styles.main} flex-center flex-column gap-050 flex-grow-1`}>
					<p className={`${styles.messagePrimary} px-050`}>This page couldn’t be found</p>
					<p className={`${styles.messageSecondary} px-050`}>
						You may not have access, or it might have been deleted or moved. Check the link and try again.
					</p>
					<Link href="/editor" className={`${styles.backButton} p-x-075 flex-center bg-hover bg-transition rounded`}>
						Back to my content
					</Link>
				</main>

				{/* TODO provide a user email */}
				<footer className={`${styles.footer} flex-center `}>
					<div className={`${styles.userInfo} flex align-center flex-wrap gap-050`}>
						<span className={styles.loggedInText}>
							Logged in as <span className={styles.email}>user email</span>
						</span>
					</div>
				</footer>
			</div>
		</div>
	);
}
