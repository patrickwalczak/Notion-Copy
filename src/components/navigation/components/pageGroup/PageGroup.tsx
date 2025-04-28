'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import File from '@/components/SVGs/File';
import ChevronRight from '@/components/SVGs/ChevronRight';
import Link from 'next/link';
import { useSafeContext } from '@/hooks/useSafeContext';
import { AppContext } from '@/context/AppContext';
import Dots from '@/components/SVGs/Dots';
import Plus from '@/components/SVGs/Plus';

const PageGroup = ({ page }: any) => {
	const [isActive, setIsActive] = useState(false);
	const [isExpanded, setisExpanded] = useState(false);
	const {
		state: { device },
	} = useSafeContext(AppContext);

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

	return (
		<div className={styles.pageContainer}>
			<Link
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				aria-expanded={isExpanded}
				aria-owns="groupId"
				aria-labelledby={String(page.id)}
				role="treeitem"
				href={`/${page.id}`}
				className={styles.pageLink}
				data-css-is-active={isActive}
			>
				<div className={styles.pageLinkContent}>
					{(device === 'mobile' || isActive) && (
						<button
							className={styles.expandBtn}
							aria-label="Expand page"
							aria-expanded={isExpanded}
							aria-describedby={String(page.id)}
							onClick={handleExpandClick}
						>
							<ChevronRight />
						</button>
					)}
					{(device === 'mobile' || !isActive) && (
						<button className={styles.pageBtn}>
							<File />
						</button>
					)}
					<div className={styles.pageNameWrapper} id={String(page.id)}>
						<span className={styles.pageName}>{page.name}</span>
					</div>
					<div className={styles.pageActions}>
						<button className={styles.moreBtn} aria-label="More">
							<Dots />
						</button>
						<button className={styles.addNewPageInExistingBtn} aria-label="Add new page">
							<Plus />
						</button>
					</div>
				</div>
			</Link>
			{false && <div role="group" aria-labelledby={String(page.id)} id="groupId"></div>}
		</div>
	);
};

export default PageGroup;
