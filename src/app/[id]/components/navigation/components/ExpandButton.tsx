import React, { Dispatch, SetStateAction } from 'react';
import ChevronRight from '@/components/SVGs/ChevronRight';
import { blockDefaultBehavior } from './pageGroup/utils';

export const ExpandButton = ({
	className = '',
	isExpanded,
	setIsExpanded,
	pageId,
}: {
	className?: string;
	isExpanded: boolean;
	setIsExpanded: Dispatch<SetStateAction<boolean>>;
	pageId: string;
}) => {
	const handleExpandClick = (e: React.MouseEvent) => {
		blockDefaultBehavior(e);
		setIsExpanded((prevState) => !prevState);
	};

	return (
		<button
			title="Expand page"
			className={`${className} primaryButton`}
			aria-label="Open"
			aria-expanded={isExpanded}
			aria-describedby={pageId}
			onClick={handleExpandClick}
		>
			<ChevronRight />
		</button>
	);
};
