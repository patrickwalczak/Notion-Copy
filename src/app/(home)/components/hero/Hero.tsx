import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const Hero = () => {
	return (
		<section className={`${styles.section}`}>
			<header className={`${styles.header} flex-column gap-1`}>
				<h1 className={`${styles.h1} text-color-primary`}>The AI workspace that works for you.</h1>
				<h2 className={`${styles.h2} text-color-primary`}>
					One place where teams find every answer, automate the busywork, and get projects done.
				</h2>
				<nav className={`${styles.nav} flex-align-center flex-wrap gap-050`}>
					<Link href={'/signup'} className={`${styles.link} buttonLikeLink buttonLikeLink--blue buttonLikeLink--large`}>
						Sign up
					</Link>
					<Link href={'/'} className={`${styles.link} buttonLikeLink buttonLikeLink--light-blue buttonLikeLink--large`}>
						Request a demo
					</Link>
				</nav>
			</header>
			<div className={`${styles.mediaContainer} flex-center`}>
				<video muted autoPlay src="/noseyHeroV2.mp4" width={1022} height={540} className={`${styles.video}`}></video>
			</div>
		</section>
	);
};

export default Hero;
