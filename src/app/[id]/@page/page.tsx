import { use } from 'react';
import PageClient from './components/pageClient/PageClient';
import { getPage } from '@/dummy';

export default function PageSlot({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedParams = use(searchParams);

	if (!resolvedParams?.page) return null;

	const pageData = use(getPage(resolvedParams.page as string));

	return <PageClient pageData={pageData} />;
}
