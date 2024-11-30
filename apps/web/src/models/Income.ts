interface IncomeProps {
	month: number;
	year: number;
	income: number;
	createdAt: string;
}

export class Income {
	month: number;
	year: number;
	income: number;
	createdAt: string;

	constructor({ month, createdAt, income, year }: IncomeProps) {
		this.income = income;
		this.createdAt = createdAt;
		this.month = month;
		this.year = year;
	}
}
