import PageClient from './components/pageClient/PageClient';
import { notFound } from 'next/navigation';
import { getPage } from '@/dummy';

export default async function Page({ params }: { params: Promise<{ id?: string; pageId?: string }> }) {
	const { pageId } = await params;

	if (!pageId) {
		notFound();
	}

	const page = await getPage(pageId);

	return <PageClient pageData={page} />;
}
