import * as Yup from 'yup';
import type { InferType } from 'yup';

export const createExpenseFormSchema = Yup.object().shape({
	name: Yup.string().required('Campo obrigatório'),
	purchaseDate: Yup.string().required('Campo obrigatório'),
	category: Yup.string(),
	totalValue: Yup.number().required('Campo obrigatório'),
	parcelQuantity: Yup.number().required('Campo obrigatório'),
	paymentMethod: Yup.object()
		.shape({
			label: Yup.string().required(),
			value: Yup.string().required(),
		})
		.required('Campo obrigatório'),
	isRecurring: Yup.boolean(),
});

export type CreateExpenseFieldsType = InferType<typeof createExpenseFormSchema>;
