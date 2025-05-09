import { formatCurrency } from '@/helpers/formatCurrency';
import { format } from 'date-fns';

interface SharedPerson {
	id: number;
	name: string;
}

interface SharedExpenseProps {
	person: SharedPerson;
	month: number;
	year: number;
	total: number;
}

export class SharedExpense {
	public person: SharedPerson;
	public total: number;
	public month: number;
	public year: number;

	constructor(data: SharedExpenseProps) {
		this.person = data.person;
		this.total = data.total;
		this.month = data.month;
		this.year = data.year;
	}

	public getTotalFormatted(): string {
		return formatCurrency(this.total);
	}

	public getMonthYearFormatted(): string {
		return format(new Date(this.year, this.month), 'MM/yyyy');
	}
}
