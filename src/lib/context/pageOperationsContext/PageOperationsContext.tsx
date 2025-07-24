import { createPageRequest, deletePageRequest } from '@/lib/api/page';
import { useSafeContext } from '@/lib/hooks/useSafeContext';
import { createContext } from 'react';
import { PagesContext } from '../pagesContext/PagesProvider';
import { useRouter, usePathname } from 'next/navigation';

interface PageOperationsContextType {
	deletePage: (pageId: string) => Promise<void>;
	dupliacatePage: (pageId: string) => Promise<void>;
	addPage: (pageId?: string) => Promise<void>;
}

export const PageOperationsContext = createContext<PageOperationsContextType | null>(null);

const PageOperationsProvider = ({ children }: { children: React.ReactNode }) => {
	const { dispatch } = useSafeContext(PagesContext);

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

	const addPage = async (pageId?: string) => {
		try {
			const newSubpage = await createPageRequest(pageId);

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

	const ctx = { deletePage, dupliacatePage, addPage };

	return <PageOperationsContext.Provider value={ctx}>{children}</PageOperationsContext.Provider>;
};

export default PageOperationsProvider;
