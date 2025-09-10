import React, { useState } from 'react';
import { ChildrenProp, ClassNameProp } from '../types';
import { mergeClasses } from '@/lib/utils/mergeClasses';
import styles from './styles.module.scss';

interface Position {
	top?: number | string;
	left?: number | string;
	bottom?: number | string;
	right?: number | string;
}

interface WrapperType extends ChildrenProp, ClassNameProp {
	initialPosition?: Position | null;
}

const PopupWrapper = ({ children, className = '', initialPosition = null }: WrapperType) => {
	const [position, setPosition] = useState<Position | null>(initialPosition);

	const refCallback = (node: HTMLDivElement) => {
		if (node) {
			const rect = node.getBoundingClientRect();

			if (rect.x < 0) {
				setPosition({ ...position, left: 0, top: '100%' });
			}
		}
	};

	return (
		<div
			ref={refCallback}
			style={{ ...position }}
			className={mergeClasses(styles.dialog, className)}
			role="dialog"
			aria-modal="true"
		>
			{children}
		</div>
	);
};

export default PopupWrapper;
