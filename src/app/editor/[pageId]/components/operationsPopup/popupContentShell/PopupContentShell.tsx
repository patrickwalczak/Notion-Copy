import { mergeClasses } from '@/lib/utils/mergeClasses';
import React from 'react';
import { ChildrenProp, ClassNameProp } from '../types';
import styles from './styles.module.scss';

type PopupContentShellType = ChildrenProp & ClassNameProp;

const PopupContentShell = ({ children, className = '' }: PopupContentShellType) => {
	return <div className={mergeClasses(styles.content, 'flex flex-column', className)}>{children}</div>;
};

export default PopupContentShell;
