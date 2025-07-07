export async function createBlockRequest(pageId: string, order: number) {
	if (!pageId) throw new Error('Missing pageId');

	const response = await fetch('/api/block', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ pageId, order }),
	});

	if (!response.ok) {
		const { error } = await response.json();
		throw new Error(error || 'Failed to create block');
	}

	const block = await response.json();
	return block;
}
