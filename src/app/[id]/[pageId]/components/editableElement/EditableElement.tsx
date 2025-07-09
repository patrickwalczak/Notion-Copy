import { ContentEditableController } from '@/lib/utils/ContentEditableController';
import React, { useMemo } from 'react';

const EditableElement = ({
	handleDispatch,
	id,
	name,
	refCallback,
	handleClick,
	placeholder,
	className,
	handleClick,
}) => {
	const { handleInput, handlePaste, handleKeyDown, handleFocus } = useMemo(
		() => new ContentEditableController(handleDispatch),
		[handleDispatch]
	);

	return (
		<div
			data-block-id={id}
			ref={refCallback}
			className={className}
			contentEditable
			tabIndex={0}
			suppressContentEditableWarning
			role="textbox"
			onInput={handleInput}
			onPaste={handlePaste}
			onKeyDown={handleKeyDown}
			onFocus={handleFocus}
			onClick={handleClick}
			data-placeholder={placeholder}
			data-css-is-empty={name ? false : true}
		/>
	);
};

export default EditableElement;
