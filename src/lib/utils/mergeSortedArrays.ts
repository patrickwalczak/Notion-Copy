export const mergeSortedArrays = <Left extends { order: number }, Right extends { order: number }>(
	left: Left[],
	right: Right[]
): Array<Left | Right> => {
	const results: Array<Left | Right> = [];

	while (left.length && right.length) {
		if (left[0].order <= right[0].order) {
			results.push(left.shift() as Left);
		} else {
			results.push(right.shift() as Right);
		}
	}

	return results.concat(left, right);
};
