'use client';

import React, { useState } from 'react';
import styles from './styles.module.scss';
import File from '@/components/SVGs/File';
import Dots from '@/components/SVGs/Dots';
import Plus from '@/components/SVGs/Plus';
import { NO_TITLE_PLACEHOLDER } from '@/lib/constants';
import { useParams, useRouter } from 'next/navigation';
import { PageEntityType } from '@/types/page';
import { createPage } from '@/lib/api/page';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { UserContext } from '@/lib/context/userContext/UserProvider';
import './index.scss';
import { ExpandButton } from '../ExpandButton';
import Link from 'next/link';

const PageGroup = ({ page, level = 0 }: { page: PageEntityType; level?: number }) => {
	const { dispatch } = useSafeContext(PagesContext);
	const {
		state: { device },
	} = useSafeContext(UserContext);

	const params = useParams();
	const router = useRouter();

	const pageName = page.properties.name || NO_TITLE_PLACEHOLDER;

	const isActive = String(params.pageId) === page.id;

	const [isExpanded, setIsExpanded] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const addSubpage = async (e: React.MouseEvent) => {
		try {
			e.preventDefault();
			const newSubpage = await createPage(page.id);
			dispatch({
				type: 'addSubpage',
				payload: {
					parentId: page.id,
					newSubpage,
				},
			});
			router.push(`/editor/${newSubpage.id}`);
		} catch (err) {
			console.log(err);
		}
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div className={'flex-column gap-025'}>
			<Link
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				aria-expanded={isExpanded}
				aria-owns="groupId"
				aria-labelledby={page.id}
				role="treeitem"
				aria-selected={isActive}
				href={`/editor/${page.id}`}
				className={`${styles.pageLink} nav-element block`}
				data-css-is-active={isActive}
				aria-current={isActive ? 'page' : undefined}
				style={{ paddingLeft: `${level * 0.75}rem` }}
			>
				<div className={`${styles.pageLinkContent} flex-align-center gap-050`}>
					{(device === 'mobile' || isHovered) && (
						<ExpandButton
							isExpanded={isExpanded}
							setIsExpanded={setIsExpanded}
							pageId={page.id}
							className={`${styles.expandBtn} page__group--button`}
						/>
					)}
					{(device === 'mobile' || !isHovered) && (
						<button className={`page__group--button primaryButton`}>
							<File />
						</button>
					)}
					<div className={`${styles.pageNameWrapper} flex-align-center flex-grow-1 truncate`} id={page.id}>
						<span className={`${styles.pageName} truncate`}>{pageName}</span>
					</div>
					<div className={`${styles.pageActions} flex-align-center flex-shrink-0 gap-050`}>
						<button
							className={`page__group--button primaryButton`}
							title="Delete, duplicate, and more"
							aria-label="Delete, duplicate, and more…"
							onClick={(e) => e.preventDefault()}
						>
							<Dots />
						</button>
						<button
							title="Add a page inside"
							className={`page__group--button primaryButton`}
							aria-label="Add a page inside"
							onClick={addSubpage}
						>
							<Plus className={'plus-svg flex-shrink-0'} />
						</button>
					</div>
				</div>
			</Link>
			{isExpanded && (
				<div role="group" aria-labelledby={page.id} id={page.id} className={styles.children}>
					{page.subpages?.length ? (
						page.subpages.map((subpage) => <PageGroup key={subpage.id} page={subpage} level={1} />)
					) : (
						<div role="treeitem" className={styles.noPagesContainer}>
							<div className={`${styles.noPagesContent} truncate`}>
								<div className={styles.noPagesText}>No pages inside</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default PageGroup;
