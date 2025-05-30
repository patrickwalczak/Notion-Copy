const getRangeAndSelection = () => ({
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
