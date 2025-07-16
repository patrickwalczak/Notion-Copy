import useIsOpenState from '@/lib/hooks/useIsOpenState';
import { renderHook, act } from '@testing-library/react';

describe('useIsOpenState', () => {
	it('should initialize with isOpen as false', () => {
		const { result } = renderHook(() => useIsOpenState());
		expect(result.current.isOpen).toBe(false);
	});

	it('should toggle isOpen state', () => {
		const { result } = renderHook(() => useIsOpenState());

		act(() => {
			result.current.toggle();
		});
		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.toggle();
		});
		expect(result.current.isOpen).toBe(false);
	});

	it('should open', () => {
		const { result } = renderHook(() => useIsOpenState());

		act(() => {
			result.current.open();
		});
		expect(result.current.isOpen).toBe(true);
	});

	it('should close', () => {
		const { result } = renderHook(() => useIsOpenState());

		act(() => {
			result.current.open();
			result.current.close();
		});
		expect(result.current.isOpen).toBe(false);
	});
});
