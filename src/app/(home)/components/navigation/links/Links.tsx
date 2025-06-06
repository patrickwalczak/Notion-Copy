import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';
import ChevronRight from '@/components/SVGs/ChevronRight';

const Links = () => {
	return (
		<ul className={`${styles.list} flex-align-center gap-025`}>
			<li className={'flex-center'}>
				<button className={`navElement button-empty flex-center gap-050`}>
					Notion
					<ChevronRight className={`${styles.icon} flex-grow-0`} />
				</button>
			</li>
			<li className={'flex-center'}>
				<Link href="#" className={`navElement`}>
					Mail
					<span>New</span>
				</Link>
			</li>
			<li className={'flex-center'}>
				<Link href="#" className={`navElement`}>
					Calendar
				</Link>
			</li>
			<li className={'flex-center'}>
				<Link href="#" className={`navElement`}>
					AI
				</Link>
			</li>
			<li className={'flex-center'}>
				<Link href="#" className={`navElement`}>
					Enterprise
				</Link>
			</li>
			<li className={'flex-center'}>
				<Link href="#" className={`navElement`}>
					Pricing
				</Link>
			</li>
			<li className={'flex-center'}>
				<button className={`navElement button-empty flex-center gap-050`}>
					Explore
					<ChevronRight className={`${styles.icon} flex-grow-0`} />
				</button>
			</li>
			<li className={'flex-center'}>
				<Link href="#" className={`navElement`}>
					Request a demo
				</Link>
			</li>
		</ul>
	);
};

export default Links;
