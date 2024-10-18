import { useSearchParams } from 'next/navigation';
import { EditExpensePage } from './EditExpense';
import { CreateExpensePage } from './CreateExpense';

export default function ExpenseFormController() {
	const searchParams = useSearchParams();

	if (searchParams.has('id')) {
		return <EditExpensePage />;
	}

	return <CreateExpensePage />;
}
