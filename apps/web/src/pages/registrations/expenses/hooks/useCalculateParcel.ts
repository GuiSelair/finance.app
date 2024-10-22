import { useCallback } from 'react';

export function useCalculateParcel() {
	const calculateParcelValue = useCallback((value: number, parcels: number) => {
		if (!value || !parcels) return 0;

		return Number((value / parcels).toFixed(2));
	}, []);

	return {
		calculateParcelValue,
	};
}
