import { UiStateType } from '@/lib/features/ui/uiSlice';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { placeCaretAtEnd } from './dom';
import { PagesSliceType, renamePage } from '@/lib/features/pages/pagesSlice';

export class ContentEditableController {
	private undoStack: string[] = [];
	private redoStack: string[] = [];
	private ignoreOnInput = false;
	private id: string | number | null;
	private dispatch: Dispatch<UnknownAction>;

	constructor(
		dispatch: ThunkDispatch<
			{
				ui: UiStateType;
				pages: PagesSliceType;
			},
			undefined,
			UnknownAction
		> &
			Dispatch<UnknownAction>,
		id: string | number | null
	) {
		this.dispatch = dispatch;
		this.id = id;
		console.log(this);
	}

	handleInput = (e: React.FormEvent) => {
		const element = e.target as HTMLElement;
		let { innerText } = element;
		let name = innerText.trim();

		if (this.ignoreOnInput) {
			this.ignoreOnInput = false;
			return;
		}

		if (element.firstChild?.nodeName === 'BR' && innerText === '\n') {
			name = innerText = '';
		}

		if (name !== this.undoStack.at(-1)) {
			this.handleAddUndoStack(name);
		}

		this.dispatch(renamePage({ id: this.id, name }));

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

		this.dispatch(renamePage({ id: this.id, name: newValue }));

		placeCaretAtEnd(element);
	};

	handleKeyDown = (event: React.KeyboardEvent) => {
		const { key, ctrlKey, target } = event;

		if (ctrlKey && key === 'z' && this.undoStack.length) {
			event.preventDefault();
			this.handleUndo(target as HTMLElement);
		}

		if (ctrlKey && key === 'y' && this.redoStack.length) {
			event.preventDefault();
			this.handleRedo(target as HTMLElement);
		}
	};

	private handleUndo(element: HTMLElement) {
		this.ignoreOnInput = true;
		const stackElement = this.undoStack.pop();

		if (stackElement) this.redoStack.push(stackElement);

		const lastUndo = this.undoStack.at(-1) || '';

		element.innerText = lastUndo;

		this.dispatch(renamePage({ id: this.id, name: lastUndo }));

		placeCaretAtEnd(element);
	}

	private handleRedo(element: HTMLElement): string | undefined {
		this.ignoreOnInput = true;
		const currentValue = element.innerText;

		const stackElement = this.redoStack.pop();

		if (!stackElement) return stackElement;

		this.undoStack.push(currentValue);

		element.innerText = stackElement;

		this.dispatch(renamePage({ id: this.id, name: stackElement }));

		placeCaretAtEnd(element);
	}
}
