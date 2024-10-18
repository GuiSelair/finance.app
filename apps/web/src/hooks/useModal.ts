import { useState } from 'react';

interface UseModalReturn<T> {
	isOpen: boolean;
	value?: T | null;
	open: () => void;
	close: () => void;
	updateValueAndOpen: (v: T) => void;
}

export function useModal<T = boolean>(defaultIsValue?: T): UseModalReturn<T> {
	const [value, setValue] = useState<T | null>(defaultIsValue || null);

	function updateValueAndOpen(v: T) {
		setValue(v);
	}

	return {
		isOpen: !!value,
		value,
		updateValueAndOpen,
		open: () => setValue(true as T),
		close: () => setValue(null),
	};
}
