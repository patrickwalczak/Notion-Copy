import React from 'react';
import Notion from '@/components/SVGs/notion/Notion';
import Link from 'next/link';
import styles from './styles.module.scss';
import SocialMedia from '../socialMedia/SocialMedia';
import ChangeLanguageButton from '../../../../../../components/changeLanguageButton/ChangeLanguageButton';
import CookieInfo from '../cookieInfo/CookieInfo';

const TopBox = () => {
	return (
		<div className={`${styles.container}`}>
			<div>
				<Link href={'/'} className={`${styles.link} flex`}>
					<Notion />
				</Link>
			</div>
			<div>
				<SocialMedia />
				<div className={`${styles.bottomBox} flex-column`}>
					<ChangeLanguageButton />
					<div className={`${styles.divider}`} />
					<CookieInfo />
					<div className={`${styles.divider}`} />
					<span className={`${styles.copyright}`}>© 2025 Notion Labs, Inc.</span>
				</div>
			</div>
		</div>
	);
};

export default TopBox;
