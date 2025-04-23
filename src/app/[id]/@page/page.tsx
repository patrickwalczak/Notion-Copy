import PageClient from './components/pageClient/PageClient';

type PageData = {
	title: string;
	content: string;
};

async function getPageData(pageId: string): Promise<PageData | null> {
	// Fetch from DB, API, etc. (this runs on the server!)
	const res = await fetch(`https://api.example.com/pages/${pageId}`, {
		cache: 'no-store',
	});

	if (!res.ok) return null;

	return res.json();
}

export default async function PageSlot({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedParams = await searchParams;

	if (!resolvedParams?.page) return null;

	// const pageData = await getPageData(pageId);
	// if (!pageData) return <div>Page not found</div>;

	return <PageClient />;
}
