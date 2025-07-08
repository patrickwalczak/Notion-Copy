import { placeCaretAtEnd } from './dom';

export class ContentEditableController {
	private undoStack: string[] = [];
	private redoStack: string[] = [];
	private ignoreOnInput = false;
	private handleDispatch: (value: string) => void;

	constructor(handleDispatch: (value: string) => void) {
		this.handleDispatch = handleDispatch;
	}

	handleInput = (e: React.FormEvent) => {
		if (this.ignoreOnInput) {
			this.ignoreOnInput = false;
			return;
		}

		const element = e.target as HTMLElement;
		let { innerText } = element;
		let name = innerText.trim();

		if (element.firstChild?.nodeName === 'BR' && innerText === '\n') {
			element.removeChild(element.firstChild);
			name = innerText = '';
		}

		if (name !== this.undoStack.at(-1)) {
			this.handleAddUndoStack(name);
		}

		this.handleDispatch(name);

		placeCaretAtEnd(element);
	};

	handleAddUndoStack(value: string) {
		this.undoStack.push(value);
	}

	handlePaste = (event: React.ClipboardEvent) => {
		event.preventDefault();

		const element = event.target as HTMLElement;
		let { innerText } = element;

		const pastedText = event.clipboardData.getData('text/plain');
		const cleanText = pastedText.replace(/\r?\n|\r/g, '').trim();
		const newValue = innerText + cleanText;

		this.handleAddUndoStack(newValue);

		innerText = newValue;

		this.handleDispatch(newValue);

		placeCaretAtEnd(element);
	};

	handleKeyDown = (event: React.KeyboardEvent) => {
		const { key, ctrlKey } = event;
		const target = event.target as HTMLElement;

		if (event.key === 'Enter') {
			event.preventDefault();
			target.blur();
			return;
		}

		if (ctrlKey && key === 'z' && this.undoStack.length) {
			event.preventDefault();
			this.handleUndo(target);
		}

		if (ctrlKey && key === 'y' && this.redoStack.length) {
			event.preventDefault();
			this.handleRedo(target);
		}
	};

	private handleUndo(element: HTMLElement) {
		this.ignoreOnInput = true;
		const stackElement = this.undoStack.pop();

		if (stackElement) this.redoStack.push(stackElement);

		const lastUndoName = this.undoStack.at(-1) || '';

		element.innerText = lastUndoName;

		this.handleDispatch(lastUndoName);

		placeCaretAtEnd(element);
	}

	private handleRedo(element: HTMLElement): string | undefined {
		this.ignoreOnInput = true;
		const currentValue = element.innerText;

		const stackElement = this.redoStack.pop();

		if (!stackElement) return stackElement;

		this.undoStack.push(currentValue);

		element.innerText = stackElement;

		this.handleDispatch(stackElement);

		placeCaretAtEnd(element);
	}

	handleFocus = (event: React.FocusEvent) => {
		const element = event.target as HTMLElement;
		placeCaretAtEnd(element);
	};
}
