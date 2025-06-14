import React from 'react';

const InputGroup = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
	return <div className={`${className} flex-column gap-025`}>{children}</div>;
};

export default InputGroup;
