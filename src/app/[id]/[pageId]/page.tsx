import PageClient from './components/pageClient/PageClient';

export default function PageIdPage() {
	return (
		<PageClient
			pageData={{
				id: '0',
				name: 'Goals',
				icon: '',
				children: [],
				parentId: null,
			}}
		/>
	);
}
