import HomeClient from './components/homeClient/HomeClient';

export default async function HomeSlot({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const resolvedParams = await searchParams;

	if (resolvedParams?.page) return null;

	return <HomeClient />;
}
