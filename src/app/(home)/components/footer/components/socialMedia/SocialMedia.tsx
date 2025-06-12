import React from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import Instagram from '@/components/SVGs/Instagram';
import Twitter from '@/components/SVGs/Twitter';
import Linkedin from '@/components/SVGs/Linkedin';
import Facebook from '@/components/SVGs/Facebook';
import YouTube from '@/components/SVGs/YouTube';

const SocialMedia = () => {
	return (
		<ul className={styles.socialMedia}>
			<Link href="#" className={styles.link} aria-label="Instagram">
				<Instagram className={styles.instagram} />
			</Link>
			<Link href="#" className={styles.link} aria-label="Twitter">
				<Twitter className={styles.twitter} />
			</Link>
			<Link href="#" className={styles.link} aria-label="LinkedIn">
				<Linkedin className={styles.linkedin} />
			</Link>
			<Link href="#" className={styles.link} aria-label="Facebook">
				<Facebook className={styles.facebook} />
			</Link>
			<Link href="#" className={styles.link} aria-label="YouTube">
				<YouTube className={styles.youTube} />
			</Link>
		</ul>
	);
};

export default SocialMedia;
