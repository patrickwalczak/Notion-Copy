import React, { useCallback } from 'react';

interface ContentEditableType {
	handleKeyDown: (e: any) => void;
	handleInput: (e: any) => void;
	handlePaste: (e: any) => void;
	className: string;
	ariaLabel: string;
	ref: any;
}

const ContentEditable = ({
	handleKeyDown,
	handleInput,
	handlePaste,
	className,
	ariaLabel,
	ref,
}: ContentEditableType) => {
	return (
		<div
			ref={ref}
			className={className}
			spellCheck
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			aria-label={ariaLabel}
			onInput={handleInput}
			onKeyDown={handleKeyDown}
			onPaste={handlePaste}
		/>
	);
};

export default ContentEditable;
