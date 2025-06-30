import PageClient from './components/pageClient/PageClient';
import { notFound } from 'next/navigation';
import { getPage } from '@/dummy';
import { use } from 'react';

export default function Page({ params }: { params: Promise<{ id?: string; pageId?: string }> }) {
	const { pageId } = use(params);

	if (!pageId) {
		notFound();
	}

	const page = use(getPage(pageId));

	return <PageClient pageData={page} />;
}
