import { getPage } from '@/lib/actions/pages/getPage';
import PageClient from './components/pageClient/PageClient';
import { notFound } from 'next/navigation';
import { PageElementType } from '@/types/page';
import PageLoader from './loading';

export default async function Page({ params }: { params: Promise<{ id?: string; pageId?: string }> }) {
	const { pageId } = await params;

	if (!pageId) {
		notFound();
	}

	const page = await getPage(pageId);

	console.log(page);

	return <PageClient pageData={page as PageElementType} />;
	// return <PageLoader />;
}
