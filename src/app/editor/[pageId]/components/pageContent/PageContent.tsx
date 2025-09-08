'use client';

import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/app/editor/providers/pagesProvider/PagesProvider';
import PageBlock from '../blocks/pageBlock/PageBlock';
import TextBlock from '../blocks/textBlock/TextBlock';
import './utils.scss';
import BlockOperationsProvider from '@/app/editor/[pageId]/providers/BlockOperationsProvider';
import PageOperationsProvider from '@/app/editor/providers/PageOperationsProvider';
import { PageContext } from '../pageClient/PageClient';
import OperartionsPopupController from '../operationsPopupController/OperationsPopupController';

const PageContent = () => {
	const {
		state: { page },
	} = useSafeContext(PagesContext);
	const { blocks, isCreatingBlock } = useSafeContext(PageContext);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const selectedBlocksRef = useRef<Set<string>>(new Set());

	useEffect(() => {
		let isSelecting = false;
		let startY = 0;
		let endY = 0;

		const handleMouseDown = (e: MouseEvent) => {
			if (!containerRef.current?.contains(e.target as Node)) return;
			e.stopPropagation();

			isSelecting = true;
			startY = e.clientY;
			endY = e.clientY;

			selectedBlocksRef.current = new Set();
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isSelecting) return;
			endY = e.clientY;

			const minY = Math.min(startY, endY);
			const maxY = Math.max(startY, endY);

			const selected = new Set<string>();

			const blockEls = containerRef.current?.querySelectorAll('[data-block-id]');
			blockEls?.forEach((el) => {
				const rect = el.getBoundingClientRect();

				const isInside = rect.bottom >= minY && rect.top <= maxY;

				if (isInside) {
					const blockId = el.getAttribute('data-block-id');
					if (blockId) {
						selected.add(blockId);

						if (!blocks.current) return;

						blocks.current.get(blockId)?.element.focus();
					}
				}
			});

			selectedBlocksRef.current = selected;
		};

		const handleMouseUp = () => {
			isSelecting = false;
		};

		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [blocks]);

	// TODO: Add loading state
	if (!page) return <div>Loading</div>;

	return (
		<div ref={containerRef} className={`${styles.contentContainer} flex flex-column gap-025`}>
			<BlockOperationsProvider>
				<PageOperationsProvider>
					<OperartionsPopupController containerRef={containerRef} />
					{page.elements.map((element) => {
						switch (element.type) {
							case 'page':
								return <PageBlock key={element.id} page={element} />;
							case 'text':
								return <TextBlock key={element.id} block={element} />;
						}
					})}
					{isCreatingBlock && (
						<div style={{ height: '21px', width: '150px' }} className="editorElement skeleton-loader py-025" />
					)}
				</PageOperationsProvider>
			</BlockOperationsProvider>
		</div>
	);
};

export default PageContent;
