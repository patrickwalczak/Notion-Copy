import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageContext } from '../../pageClient/PageClient';
import { PageModelType } from '@/types/page';
import { mergeClasses } from '@/lib/utils/mergeClasses';

const PageBlock = ({ page }: { page: PageModelType }) => {
	const { getBlocksRef } = useSafeContext(PageContext);
	const {
		id,
		type,
		properties: { name },
		order,
		isFocusable,
	} = page;

	const refCallback = (node: HTMLAnchorElement) => {
		const refsMap = getBlocksRef();

		if (node) {
			refsMap.set(id, { type, element: node, id, order, isFocusable });
		}

		return () => {
			refsMap.delete(id);
		};
	};

	return (
		<Link
			id={`block-${page.id}`}
			ref={refCallback}
			onClick={(e) => e.stopPropagation()}
			className={mergeClasses(styles.link, 'editorElement')}
			href={page.id}
		>
			{name || NO_TITLE_PLACEHOLDER}
		</Link>
	);
};

export default PageBlock;
