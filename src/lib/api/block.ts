import { BlockElementType } from '@/types/block';
import { CreateDefaultBlockType, DuplicateBlockPayloadType, UpdateBlockParams } from '@/types/functions.models';

export async function createDefaultBlockRequest({
	pageId,
	prevOrder,
	nextOrder,
}: CreateDefaultBlockType): Promise<BlockElementType> {
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

export async function duplicateBlockRequest({
	pageId,
	blockId,
	prevOrder,
	nextOrder,
}: DuplicateBlockPayloadType): Promise<BlockElementType> {
	if (!pageId) throw new Error('Missing pageId');

	if (!blockId) throw new Error('Missing blockId');

	const response = await fetch('/api/block/duplicate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ pageId, prevOrder, nextOrder, blockId }),
	});

	if (!response.ok) {
		const { error } = await response.json();
		throw new Error(error || 'Failed to create block');
	}

	const block = await response.json();

	return block;
}

export async function updateBlockPropertiesRequest({ blockId, properties }: UpdateBlockParams) {
	try {
		const res = await fetch('/api/block/updateProperties', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ blockId, properties }),
		});

		const data = await res.json();
		if (!res.ok) {
			return { error: data.error || 'Failed to update block' };
		}

		return { success: true };
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
