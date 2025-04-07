import React from 'react';
import styles from '../../navigation.module.scss';
import File from '@/components/SVGs/File';
import AddNewPage from '@/components/addNewPage/AddNewPage';
import MoreButton from '@/components/moreButton/MoreButton';
import ChevronRight from '@/components/SVGs/ChevronRight';
import Link from 'next/link';

const PageGroup = ({ page }: any) => {
	return (
		<div className={styles.pageContainer}>
			<Link
				aria-expanded={false}
				aria-owns="groupId"
				aria-labelledby={String(page.id)}
				role="treeitem"
				href={`/${page.id}`}
				className={styles.pageLink}
			>
				<div className={styles.pageLinkContent}>
					<button
						className={styles.expandBtn}
						aria-label="Expand page"
						aria-expanded={false}
						aria-describedby={String(page.id)}
					>
						<ChevronRight />
					</button>
					<div className={styles.pageIcon}>
						<File />
					</div>
					<div className={styles.pageNameWrapper} id={String(page.id)}>
						<span className={styles.pageName}>{page.name}</span>
					</div>
					<div className={styles.pageActions}>
						<MoreButton className={styles.moreBtn} />
						<AddNewPage buttonClass={styles.addNewPageInExistingBtn} svgClass={styles.plusSvg} />
					</div>
				</div>
			</Link>
			{false && <div role="group" aria-labelledby={String(page.id)} id="groupId"></div>}
		</div>
	);
};

export default PageGroup;
