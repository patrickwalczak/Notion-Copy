import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.scss';
import { PageEntityType } from '@/types/page';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageContext } from '../../pageClient/PageClient';
import Block from '../block/Block';
import BlockActions from '../../blockActions/BlockActions';
import PageOperationsPopup from '../../blockOperations/PageOperationsPopup';

const PageBlock = ({ page }: { page: PageEntityType }) => {
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
			className={`${styles.link} py-025`}
			href={page.id}
		>
			{name || NO_TITLE_PLACEHOLDER}
		</Link>
	);
};

export default PageBlock;
