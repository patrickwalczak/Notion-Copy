'use client';

import React from 'react';
import styles from './styles.module.scss';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import PageBlock from '../blocks/pageBlock/PageBlock';
import TextBlock from '../blocks/textBlock/TextBlock';
import './utils.scss';
import Block from '../blocks/block/Block';

const PageContent = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	// TODO: Add loading state
	if (!page) return <div>Loading</div>;

	return (
		<div className={`${styles.contentContainer} flex-column gap-025`}>
			{page.elements.map((element) => {
				switch (element.type) {
					case 'page':
						return (
							<Block block={element} key={element.id}>
								<PageBlock key={element.id} page={element} />
							</Block>
						);
					case 'text':
						return (
							<Block block={element} key={element.id}>
								<TextBlock
									blockType={element.type}
									key={element.id}
									name={element.properties.name}
									blockId={element.id}
									order={element.order}
								/>
							</Block>
						);
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
