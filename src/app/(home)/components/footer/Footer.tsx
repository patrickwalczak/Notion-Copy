import React from 'react';
import TopBox from './components/topBox/TopBox';
import { LinksList } from './components/linksList/LinksList';
import Link from 'next/link';
import styles from './styles.module.scss';

type LinkType = { id: string; name: string; href: string; isSpecial?: boolean };

interface FooterLinksType {
	[key: string]: LinkType[];
}

const footerLinks: FooterLinksType = {
	Company: [
		{ id: 'about-us', name: 'About us', href: '/' },
		{ id: 'careers', name: 'Careers', href: '/' },
		{ id: 'security', name: 'Security', href: '/' },
		{ id: 'status', name: 'Status', href: '/' },
		{ id: 'terms-privacy', name: 'Terms & privacy', href: '/' },
		{ id: 'privacy-rights', name: 'Your privacy rights', href: '/' },
	],
	Download: [
		{ id: 'ios-android', name: 'iOS & Android', href: '/' },
		{ id: 'mac-windows', name: 'Mac & Windows', href: '/' },
		{ id: 'calendar', name: 'Calendar', href: '/' },
		{ id: 'web-clipper', name: 'Web Clipper', href: '/' },
	],
	Resources: [
		{ id: 'help-center', name: 'Help center', href: '/' },
		{ id: 'pricing', name: 'Pricing', href: '/' },
		{ id: 'blog', name: 'Blog', href: '/' },
		{ id: 'community', name: 'Community', href: '/' },
		{ id: 'integrations', name: 'Integrations', href: '/' },
		{ id: 'templates', name: 'Templates', href: '/' },
		{ id: 'affiliates', name: 'Affiliates', href: '/' },
	],
	'Notion for': [
		{ id: 'enterprise', name: 'Enterprise', href: '/' },
		{ id: 'small-business', name: 'Small business', href: '/' },
		{ id: 'personal', name: 'Personal', href: '/' },
		{ id: 'explore-more', name: 'Explore more', href: '/', isSpecial: true },
	],
};

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<nav className={`flex ${styles.footerNav}`}>
				<TopBox />
				<div className={styles.footerLinksWrapper}>
					<div className={styles.footerLinks}>
						{Object.entries(footerLinks).map(([section, links]) => (
							<LinksList key={section} listLabel={section}>
								{links.map(({ id, name, href, isSpecial }) => (
									<li className={`${styles.listItem} ${isSpecial ? styles[`listItem--special`] : ''}`} key={id}>
										<Link className={`${styles.link} ${isSpecial ? styles[`link--special`] : ''}`} href={href}>
											{name}
										</Link>
									</li>
								))}
							</LinksList>
						))}
					</div>
				</div>
			</nav>
		</footer>
	);
};

export default Footer;
