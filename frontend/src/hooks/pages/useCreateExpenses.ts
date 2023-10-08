
export type ICreateExpenseFields = {
	name: string;
	category: string;
	totalValue: number;
	parcelQuantity: number;
	cardId: string;
}

export function useCreateExpenses() {
	function calculateParcelValue(value: number, parcels: number) {
		if (!value || !parcels) return 0;

		return (value / parcels).toFixed(2);
	}

	function createExpenseSubmit(data: ICreateExpenseFields): Promise<void>{
		console.log('createExpenseSubmit')
		console.log(data)
	}

	return {
		calculateParcelValue,
		createExpenseSubmit,
	};
}
