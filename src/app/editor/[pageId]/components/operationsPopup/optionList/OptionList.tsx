import React, { ReactNode } from 'react';
import styles from './styles.module.scss';
import { mergeClasses } from '@/lib/utils/mergeClasses';

type RootProps = {
	className?: string;
	children: ReactNode;
};

type HeaderProps = {
	children: ReactNode; // header text
	className?: string;
};

type ListProps = {
	className?: string;
	children: ReactNode;
};

const Root = ({ className = '', children }: RootProps) => (
	<div className={mergeClasses(className, 'flex flex-column')}>{children}</div>
);

const Header = ({ children, className = '' }: HeaderProps) => (
	<div className={mergeClasses(styles.header, className)}>{children}</div>
);

const List = ({ className = '', children }: ListProps) => (
	<ul className={mergeClasses('flex', 'flex-column', className)} role="listbox">
		{children}
	</ul>
);

export const OptionList = Object.assign(Root, { Header, List });
export default OptionList;
