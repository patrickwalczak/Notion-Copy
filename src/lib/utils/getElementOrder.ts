export function getElementOrder(prevOrder?: number, nextOrder?: number): number {
	// Case 1: no prev, no next → insert at 0
	if (prevOrder === undefined && nextOrder === undefined) {
		return 0;
	}

	// Case 2: no prev, has next → insert before the provided next
	if (prevOrder === undefined && nextOrder !== undefined) {
		return nextOrder - 1;
	}

	// Case 3: has prev, has next → insert between
	if (prevOrder !== undefined && nextOrder !== undefined) {
		return (prevOrder + nextOrder) / 2;
	}

	// Case 4: has prev, no next → insert after the provided prev
	if (prevOrder !== undefined && nextOrder === undefined) {
		return prevOrder + 1;
	}

	return 0;
}
