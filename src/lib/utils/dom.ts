export const getRangeAndSelection = () => ({
	selection: window.getSelection(),
	range: document.createRange(),
});

const changeSelectionRange = (selection: Selection | null, range: Range) => {
	selection?.removeAllRanges();
	selection?.addRange(range);
};

export const selectText = (element: HTMLElement) => {
	const { selection, range } = getRangeAndSelection();
	range.selectNodeContents(element);
	changeSelectionRange(selection, range);
};

export const placeCaretAtEnd = (element: HTMLElement, collapse = false) => {
	const { selection, range } = getRangeAndSelection();
	range.selectNodeContents(element);
	range.collapse(collapse);
	changeSelectionRange(selection, range);
};

export function isCaretAtEndOfLine(): boolean {
	const selection = window.getSelection();
	if (!selection || !selection.isCollapsed || selection.rangeCount === 0) return false;

	const range = selection.getRangeAt(0);
	const clonedRange = range.cloneRange();

	// Try to move forward by 1 character
	try {
		clonedRange.setStart(clonedRange.endContainer, clonedRange.endOffset + 1);
	} catch {
		// We're at the very end of the node, so nothing to move into
		return true;
	}

	const currentRects = range.getClientRects();
	const nextRects = clonedRange.getClientRects();

	if (!currentRects.length || !nextRects.length) return true;

	const currentTop = currentRects[currentRects.length - 1].top;
	const nextTop = nextRects[0].top;

	return Math.floor(currentTop) !== Math.floor(nextTop);
}
