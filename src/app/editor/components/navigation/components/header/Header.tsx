'use client';

import React, { ReactNode } from 'react';
import styles from './header.module.scss';
import ChevronRight from '@/components/SVGs/ChevronRight';
import { UserContext } from '@/lib/context/userContext/UserProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

const Header = ({ children }: { children: ReactNode }) => {
	const {
		state: { email },
	} = useSafeContext(UserContext);

	return (
		<div className={`${styles.container} flex align-center gap-050 p-y-075 px-050`}>
			<span className={`${styles.userInitial} flex-center flex-grow-0 rounded-sm p-050`}>{email[0]}</span>
			<button className={`${styles.userNameBtn} flex align-center flex-grow-1 truncate button-empty gap-050 `}>
				<span className={'truncate'}>{email}</span>
				{/* <ChevronRight className="flex-grow-0" /> */}
			</button>
			{children}
		</div>
	);
};

export default Header;
