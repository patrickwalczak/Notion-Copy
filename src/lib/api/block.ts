import { BlockBaseType } from '@/types/block';
import { CreateDefaultBlockType } from '@/types/functions.models';

export async function createDefaultBlockRequest({
	pageId,
	prevOrder,
	nextOrder,
}: CreateDefaultBlockType): Promise<BlockBaseType> {
	if (!pageId) throw new Error('Missing pageId');

	const response = await fetch('/api/block/create', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ pageId, prevOrder, nextOrder }),
	});

	if (!response.ok) {
		const { error } = await response.json();
		throw new Error(error || 'Failed to create block');
	}

	return response.json();
}

type UpdateBlockParams = {
	blockId: string;
	name: string;
};

export async function updateBlockNameRequest({ blockId, name }: UpdateBlockParams) {
	try {
		const res = await fetch('/api/block/updateName', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ blockId, name: name }),
		});

		const data = await res.json();
		if (!res.ok) {
			return { error: data.error || 'Failed to update block' };
		}

		return { success: true };
	} catch (err) {
		return { error: 'Network error or unexpected failure' };
	}
}

export const deleteBlockRequest = async (blockId: string) => {
	const res = await fetch('/api/block', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ blockId }),
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.error || 'Failed to delete block');
	}
};
