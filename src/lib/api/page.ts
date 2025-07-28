export async function renamePageRequest(pageId: string, name: string) {
	const response = await fetch('/api/page', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			action: 'rename',
			payload: { pageId, name },
		}),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error?.error || 'Rename failed');
	}

	return response.json();
}

export async function createSubpageRequest(parentId?: string) {
	const res = await fetch('/api/page/createSubpage', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ parentId }),
	});

	if (!res.ok) {
		const { error } = await res.json();
		throw new Error(error || 'Failed to create page');
	}

	return res.json();
}

export async function createRootPageRequest(lastOrder: number) {
	const res = await fetch('/api/page/createRoot', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ lastOrder }),
	});

	if (!res.ok) {
		const { error } = await res.json();
		throw new Error(error || 'Failed to create root page');
	}

	return res.json();
}

export async function deletePageRequest(pageId: string) {
	const res = await fetch('/api/page', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ pageId }),
	});

	if (!res.ok) {
		const { error } = await res.json();
		throw new Error(error || 'Failed to delete page');
	}

	return res.json();
}
