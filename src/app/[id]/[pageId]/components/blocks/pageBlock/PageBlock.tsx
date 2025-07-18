import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';
import { PageEntityType, PageTypesType } from '@/types/page';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageContext } from '../../pageClient/PageClient';

const PageBlock = ({
	page,
	blockId,
	name,
	blockType,
	order,
}: {
	page: PageEntityType;
	blockId: string;
	name: string;
	blockType: PageTypesType;
	order: number;
}) => {
	const { getBlocksRef } = useSafeContext(PageContext);

	const refCallback = (node: HTMLAnchorElement) => {
		const refsMap = getBlocksRef();

		if (node) {
			refsMap.set(blockId, { type: blockType, element: node, id: blockId, order, isFocusable: false });
		}

		return () => {
			refsMap.delete(blockId);
		};
	};

	return (
		<Link
			tabIndex={0}
			ref={refCallback}
			onClick={(e) => e.stopPropagation()}
			className={`${styles.link} p-y-025`}
			href={page.id}
		>
			{name || NO_TITLE_PLACEHOLDER}
		</Link>
	);
};

export default PageBlock;
