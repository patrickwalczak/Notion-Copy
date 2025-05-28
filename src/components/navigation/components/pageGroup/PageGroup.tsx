'use client';

import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import File from '@/components/SVGs/File';
import ChevronRight from '@/components/SVGs/ChevronRight';
import Link from 'next/link';
import Dots from '@/components/SVGs/Dots';
import Plus from '@/components/SVGs/Plus';
import { useAppSelector } from '@/lib/hooks';

const PageGroup = ({ page }) => {
	const {
		ui: { device },
		pages: { activePageId },
	} = useAppSelector((state) => state);

	const linkRef = useRef(null);

	const [isActive, setIsActive] = useState(false);
	const [isExpanded, setisExpanded] = useState(false);

	const handleMouseEnter = () => {
		setIsActive(true);
	};

	const handleMouseLeave = () => {
		if (isExpanded) return;

		setIsActive(false);
	};

	const handleExpandClick = () => {
		setisExpanded((prevState) => !prevState);
	};

	const addPageInside = (e) => {
		e.stopPropagation();
		e.preventDefault();
	};

	const handleLinkClick = (e) => {
		// e.stopPropagation();
		// e.preventDefault();
	};

	return (
		<div className={styles.pageContainer}>
			<Link
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
			>
				<div className={`${styles.pageLinkContent} flex-align-center gap-050`}>
					{(device === 'mobile' || isActive) && (
						<button
							title="Expand page"
							className={`${styles.expandBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
							aria-label="Expand page"
							aria-expanded={isExpanded}
							aria-describedby={String(page.id)}
							onClick={handleExpandClick}
						>
							<ChevronRight />
						</button>
					)}
					{(device === 'mobile' || !isActive) && (
						<button
							className={`${styles.pageBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
						>
							<File />
						</button>
					)}
					<div className={`${styles.pageNameWrapper} flex-align-center flex-grow-1 truncate`} id={String(page.id)}>
						<span className={`${styles.pageName} truncate`}>{page.name}</span>
					</div>
					<div className={`${styles.pageActions} flex-align-center flex-shrink-0 gap-050`}>
						<button
							className={`${styles.moreBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
							aria-label="More"
							onClick={addPageInside}
						>
							<Dots />
						</button>
						<button
							className={`${styles.addNewPageInExistingBtn} flex-center p-025 rounded bg-transition bg-hover button-empty flex-shrink-0`}
							aria-label="Add new page"
						>
							<Plus className={'plus-svg flex-shrink-0'} />
						</button>
					</div>
				</div>
			</Link>
			{false && <div role="group" aria-labelledby={String(page.id)} id="groupId"></div>}
		</div>
	);
};

export default PageGroup;

// id, name, type
