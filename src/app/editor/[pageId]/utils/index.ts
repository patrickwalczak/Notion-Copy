import { placeCaretAtEnd } from '@/lib/utils/dom';

export const handleFocus = (element: HTMLElement) => {
	element.focus();
	requestAnimationFrame(() => placeCaretAtEnd(element));
};
