import { getPage } from '@/lib/actions/pages/getPage';
import PageClient from './components/pageClient/PageClient';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id?: string; pageId?: string }> }) {
	const { pageId } = await params;

	if (!pageId) notFound();

	const page = await getPage(pageId);

	if (!page) notFound();

	return <PageClient pageData={page} />;
}
