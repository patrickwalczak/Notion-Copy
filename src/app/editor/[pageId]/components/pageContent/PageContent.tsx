'use client';

import React from 'react';
import styles from './styles.module.scss';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import PageBlock from '../blocks/pageBlock/PageBlock';
import TextBlock from '../blocks/textBlock/TextBlock';
import './utils.scss';
import BlockOperationsProvider from '@/lib/context/blockOperationsContext/BlockOperationsContext';
import PageOperationsProvider from '@/lib/context/pageOperationsContext/PageOperationsContext';

const PageContent = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);

	// TODO: Add loading state
	if (!page) return <div>Loading</div>;

	return (
		<div className={`${styles.contentContainer} flex-column gap-025`}>
			<BlockOperationsProvider>
				<PageOperationsProvider>
					{page.elements.map((element) => {
						switch (element.type) {
							case 'page':
								return (
									<PageBlock
										key={element.id}
										page={element}
										name={element.properties.name}
										blockId={element.id}
										order={element.order}
										blockType={element.type}
									/>
								);
							case 'text':
								return <TextBlock key={element.id} block={element} />;
						}
					})}
				</PageOperationsProvider>
			</BlockOperationsProvider>
		</div>
	);
};

export default PageContent;
