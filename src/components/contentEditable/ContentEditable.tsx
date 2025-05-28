import React, { useCallback } from 'react';

interface ContentEditableType {
	handleKeyDown: (e: any) => void;
	handleInput: (e: any) => void;
	handlePaste: (e: any) => void;
	className: string;
	ariaLabel: string;
	tabIndex?: number;
	ref: any;
}

const ContentEditable = ({
	handleKeyDown,
	handleInput,
	handlePaste,
	className,
	ariaLabel,
	tabIndex,
	ref,
}: ContentEditableType) => {
	return (
		<div
			ref={ref}
			className={className}
			spellCheck
			contentEditable
			tabIndex={tabIndex}
			suppressContentEditableWarning
			role="textbox"
			aria-label={ariaLabel}
			onInput={handleInput}
			onKeyDown={handleKeyDown}
			onPaste={handlePaste}
			placeholder={'Untitled'}
		/>
	);
};

export default ContentEditable;
