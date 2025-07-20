import { createContext } from 'react';

interface PageOperationsContextType {
	deletePage: (pageId: string) => Promise<void>;
	dupliacatePage: (pageId: string) => Promise<void>;
}

export const PageOperationsContext = createContext<PageOperationsContextType | null>(null);

const PageOperationsProvider = ({ children }: { children: React.ReactNode }) => {
	const deletePage = async (pageId: string) => {
		try {
		} catch (err) {}
	};

	const dupliacatePage = async (pageId: string) => {
		try {
		} catch (err) {}
	};

	const ctx = { deletePage, dupliacatePage };

	return <PageOperationsContext.Provider value={ctx}>{children}</PageOperationsContext.Provider>;
};

export default PageOperationsProvider;
