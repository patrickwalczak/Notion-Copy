import { createSubpageRequest, deletePageRequest, createRootPageRequest } from '@/lib/api/page';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { createContext } from 'react';
import { PagesContext } from '../pagesContext/PagesProvider';
import { useRouter, usePathname } from 'next/navigation';

interface PageOperationsContextType {
	deletePage: (pageId: string) => Promise<void>;
	dupliacatePage: (pageId: string) => Promise<void>;
	createSubpage: (pageId: string) => Promise<void>;
	createRootPage: () => Promise<void>;
}

export const PageOperationsContext = createContext<PageOperationsContextType | null>(null);

const PageOperationsProvider = ({ children }: { children: React.ReactNode }) => {
	const {
		dispatch,
		state: { pages },
	} = useSafeContext(PagesContext);

	const router = useRouter();
	const pathname = usePathname();

	const deletePage = async (pageId: string) => {
		const isCurrentPage = pathname === `/editor/${pageId}`; // strict check

		try {
			dispatch({ type: 'removePage', payload: { pageId } });
			await deletePageRequest(pageId);

			if (isCurrentPage) router.push('/editor');
		} catch (err) {
			dispatch({ type: 'restorePage', payload: { pageId } });
			console.error(err);
		}
	};

	const dupliacatePage = async (pageId: string) => {
		try {
		} catch (err) {}
	};

	const createSubpage = async (pageId: string) => {
		try {
			const newSubpage = await createSubpageRequest(pageId);

			dispatch({
				type: 'addPage',
				payload: {
					parentId: pageId,
					newSubpage,
				},
			});
			router.push(`/editor/${newSubpage.id}`);
		} catch (err) {
			console.log(err);
		}
	};

	const createRootPage = async () => {
		try {
			const lastOrder = pages.length > 0 ? pages[pages.length - 1].order : -1;

			const newSubpage = await createRootPageRequest(lastOrder);

			dispatch({
				type: 'addPage',
				payload: {
					newSubpage,
				},
			});

			router.push(`/editor/${newSubpage.id}`);
		} catch (err) {
			console.error('Failed to create root page:', err);
		}
	};

	const ctx = { deletePage, dupliacatePage, createSubpage, createRootPage };

	return <PageOperationsContext.Provider value={ctx}>{children}</PageOperationsContext.Provider>;
};

export default PageOperationsProvider;
