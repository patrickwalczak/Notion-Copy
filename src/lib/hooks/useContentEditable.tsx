import { useRef } from 'react';
import { placeCaretAtEnd } from '../utils/dom';

export function useContentEditableController(initialValue: string, handleDispatch: (value: string) => void) {
	const undoStack = useRef<string[]>([]);
	const redoStack = useRef<string[]>([]);
	const ignoreOnInput = useRef(false);

	const handleAddUndoStack = (value: string) => {
		undoStack.current.push(value);
	};

	const handleInput = (e: React.FormEvent) => {
		e.preventDefault();
		e.stopPropagation();

		if (ignoreOnInput.current) {
			ignoreOnInput.current = false;
			return;
		}

		const element = e.target as HTMLElement;
		let { innerText } = element;
		let name = innerText.trim();

		if (element.firstChild?.nodeName === 'BR' && innerText === '\n') {
			element.removeChild(element.firstChild);
			name = innerText = '';
		}

		if (name !== undoStack.current.at(-1)) {
			handleAddUndoStack(name);
		}

		handleDispatch(name);

		requestAnimationFrame(() => placeCaretAtEnd(element));
	};

	const handlePaste = (event: React.ClipboardEvent) => {
		event.preventDefault();

		const element = event.target as HTMLElement;
		const { innerText } = element;

		const pastedText = event.clipboardData.getData('text/plain');
		const cleanText = pastedText.replace(/\r?\n|\r/g, '').trim();
		const newValue = innerText + cleanText;

		handleAddUndoStack(newValue);

		element.innerText = newValue;

		handleDispatch(newValue);
	};

	const handleUndo = (element: HTMLElement) => {
		ignoreOnInput.current = true;
		const stackElement = undoStack.current.pop();
		if (stackElement) redoStack.current.push(stackElement);

		const lastUndoName = undoStack.current.at(-1) || '';
		element.innerText = lastUndoName;

		handleDispatch(lastUndoName);
	};

	const handleRedo = (element: HTMLElement) => {
		ignoreOnInput.current = true;
		const stackElement = redoStack.current.pop();
		if (!stackElement) return;

		undoStack.current.push(element.innerText);
		element.innerText = stackElement;

		handleDispatch(stackElement);

		placeCaretAtEnd(element);
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		const { key, ctrlKey } = event;
		const target = event.target as HTMLElement;

		if (ctrlKey && key === 'z' && undoStack.current.length) {
			event.preventDefault();
			handleUndo(target);
		}

		if (ctrlKey && key === 'y' && redoStack.current.length) {
			event.preventDefault();
			handleRedo(target);
		}
	};

	return {
		handleInput,
		handlePaste,
		handleKeyDown,
	};
}
