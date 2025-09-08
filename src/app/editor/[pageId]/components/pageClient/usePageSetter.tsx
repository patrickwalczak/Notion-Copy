import { PagesContext } from '@/lib/context/pagesContext/PagesProvider';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { PageWithBlocksAndSubpages } from '@/types/page';
import { useEffect } from 'react';

const usePageSetter = (pageData: PageWithBlocksAndSubpages) => {
	const { dispatch } = useSafeContext(PagesContext);

	// TODO Improve it
	useEffect(() => {
		dispatch({ type: 'setPage', payload: { page: pageData } });

		return () => dispatch({ type: 'setPage', payload: { page: null } });
	}, [dispatch, pageData]);
};

export default usePageSetter;
