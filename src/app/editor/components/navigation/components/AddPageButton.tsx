import React from 'react';
import Plus from '@/components/SVGs/Plus';
import { PageOperationsContext } from '@/lib/context/pageOperationsContext/PageOperationsContext';
import { useSafeContext } from '@/lib/hooks/useSafeContext';

const AddPageButton = () => {
	const { createRootPage } = useSafeContext(PageOperationsContext);

	const handleClick = async () => {
		await createRootPage();
	};

	return (
		<button
			onClick={handleClick}
			className={`nav__add-page-btn nav-element flex-align-center gap-050 button-empty bg-transition bg-hover`}
		>
			<Plus className="plus-svg flex-grow-0" />
			<span className="block truncate flex-grow-1">Add new</span>
		</button>
	);
};

export default AddPageButton;
