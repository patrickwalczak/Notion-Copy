'use client';
import { useState } from 'react';

const useVisibilityManager = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleVisibility = () => setIsOpen((prevState) => !prevState);

	const close = () => setIsOpen(false);

	const open = () => setIsOpen(true);

	return { isOpen, toggleVisibility, close, open };
};

export default useVisibilityManager;
