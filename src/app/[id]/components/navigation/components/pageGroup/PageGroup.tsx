'use client';

import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import File from '@/components/SVGs/File';
import ChevronRight from '@/components/SVGs/ChevronRight';
import Dots from '@/components/SVGs/Dots';
import Plus from '@/components/SVGs/Plus';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { DeviceType } from '@/types/shared';
import { useRouter, useSearchParams } from 'next/navigation';

const PageGroup = ({ page, device }: { page: any; device: DeviceType }) => {
	const router = useRouter();

	const pageName = page.name || NO_TITLE_PLACEHOLDER;
	const searchParams = useSearchParams();
	const isActive = String(searchParams.get('page')) === String(page.id);

	const linkRef = useRef(null);

	const [isExpanded, setisExpanded] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleExpandClick = () => {
		setisExpanded((prevState) => !prevState);
	};

	const blockDefaultBehavior = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const addPageInside = (e) => {
		blockDefaultBehavior(e);
	};

	const handleLinkClick = (e: React.MouseEvent) => {
		blockDefaultBehavior(e);
		router.push(`?page=${page.id}`);
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className={styles.pageContainer}>
			<a
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				aria-expanded={isExpanded}
				aria-owns="groupId"
				aria-labelledby={String(page.id)}
				role="treeitem"
				aria-selected={isActive}
				href={`?page=${page.id}`}
				className={`${styles.pageLink} nav-element block`}
				data-css-is-active={isActive}
				onClick={handleLinkClick}
				ref={linkRef}
				aria-current={isActive ? 'page' : undefined}
			>
				<div className={`${styles.pageLinkContent} flex-align-center gap-050`}>
					{(device === 'mobile' || isHovered) && (
						<button
							title="Expand page"
							className={`${styles.expandBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
							aria-label="Open"
							aria-expanded={isExpanded}
							aria-describedby={String(page.id)}
							onClick={handleExpandClick}
						>
							<ChevronRight />
						</button>
					)}
					{(device === 'mobile' || !isHovered) && (
						<button
							className={`${styles.pageBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
						>
							<File />
						</button>
					)}
					<div className={`${styles.pageNameWrapper} flex-align-center flex-grow-1 truncate`} id={String(page.id)}>
						<span className={`${styles.pageName} truncate`}>{pageName}</span>
					</div>
					<div className={`${styles.pageActions} flex-align-center flex-shrink-0 gap-050`}>
						<button
							className={`${styles.moreBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
							aria-label="Delete, duplicate, and more…"
							onClick={addPageInside}
						>
							<Dots />
						</button>
						<button
							className={`${styles.addNewPageInExistingBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
							aria-label="Add a page inside"
						>
							<Plus className={'plus-svg flex-shrink-0'} />
						</button>
					</div>
				</div>
			</a>
			{false && <div role="group" aria-labelledby={String(page.id)} id="groupId"></div>}
		</div>
	);
};

export default PageGroup;
