'use client';

import React from 'react';
import styles from './styles.module.scss';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import PageBlock from '../blocks/pageBlock/PageBlock';
import TextBlock from '../blocks/textBlock/TextBlock';
import './utils.scss';

export const merge = <Left extends { order: number }, Right extends { order: number }>(
	left: Left[],
	right: Right[]
): Array<Left | Right> => {
	const results: Array<Left | Right> = [];

	while (left.length && right.length) {
		if (left[0].order <= right[0].order) {
			results.push(left.shift() as Left);
		} else {
			results.push(right.shift() as Right);
		}
	}

	return results.concat(left, right);
};

const PageContent = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	// TODO: Add loading state
	if (!page) return null;

	const elements = [...page.blocks, ...page.subpages].sort((a, b) => a.order - b.order);
	console.log(elements);

	return (
		<div className={`${styles.contentContainer} flex-column gap-025`}>
			{elements.map((element) => {
				switch (element.type) {
					case 'page':
						return <PageBlock key={element.id} page={element} />;
					case 'text':
						return <TextBlock key={element.id} block={element} />;
				}
			})}
		</div>
	);
};

export default PageContent;

// ... (operations pop up)
// drag and drop
// click to open menu
// + to add a block

// Every element will have a popup menu to conduct different operations
// Every element will have a drag and drop feature
// Every element will have a click to open menu
// Every element will have a + to add a block

// I can build an element that will act as a wrapper and will have all these features
// or I can build some reusable components and compose each block with them
