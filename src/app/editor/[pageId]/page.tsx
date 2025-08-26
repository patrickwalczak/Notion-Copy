import { getPage } from '@/lib/actions/pages/getPage';
import PageClient from './components/pageClient/PageClient';
import { notFound } from 'next/navigation';
import { PageFullEntityType } from '@/types/page';
import PageLoader from './loading';

export default async function Page({ params }: { params: Promise<{ id?: string; pageId?: string }> }) {
	const { pageId } = await params;

	if (!pageId) {
		notFound();
	}

	const page = await getPage(pageId);

	await new Promise((resolve) => setTimeout(resolve, 4000));

	if (!page) {
		return notFound();
	}

	// return <PageClient pageData={page as PageFullEntityType} />;
	return <PageLoader />;
}
