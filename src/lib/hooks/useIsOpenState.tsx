'use client';

import { useState, useCallback } from 'react';

export default function useIsOpenState(initial = false) {
	const [isOpen, setIsOpen] = useState(initial);

	const toggle = useCallback(() => {
		setIsOpen((prev) => !prev);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	const open = useCallback(() => {
		setIsOpen(true);
	}, []);

	return { isOpen, toggle, close, open };
}
