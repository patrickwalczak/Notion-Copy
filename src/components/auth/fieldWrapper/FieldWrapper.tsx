import React from 'react';

interface FieldWrapperProps {
	children: React.ReactNode;
	className?: string;
}

const FieldWrapper = ({ children, className }: FieldWrapperProps) => {
	return <div className={className}>{children}</div>;
};

export default FieldWrapper;
