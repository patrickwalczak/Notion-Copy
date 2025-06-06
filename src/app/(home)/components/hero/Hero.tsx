import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

const Hero = () => {
	return (
		<section className={`${styles.section} flex-align-center justify-between gap-1`}>
			<header className={`${styles.header} flex-column gap-050`}>
				<h1 className={`${styles.h1} text-color-primary font-700`}>The AI workspace that works for you.</h1>
				<h2 className={`${styles.h2} text-color-primary font-500`}>
					One place where teams find every answer, automate the busywork, and get projects done.
				</h2>
				<nav className="flex-align-center gap-050">
					<Link href={'/'} className={`${styles.link} buttonLikeLink buttonLikeLink--blue buttonLikeLink--large`}>
						Get Notion Free
					</Link>
					<Link href={'/'} className={`${styles.link} buttonLikeLink buttonLikeLink--light-blue buttonLikeLink--large`}>
						Request a demo
					</Link>
				</nav>
			</header>
			<div className={`${styles.mediaContainer}`}>
				<video
					muted
					autoPlay
					src="/public/noseyHeroV2.mp4"
					width={1022}
					height={540}
					className={`${styles.video}`}
				></video>
			</div>
		</section>
	);
};

export default Hero;
