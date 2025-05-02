import * as yup from 'yup';
import type { InferType } from 'yup';

export const sharePeopleExpenseSchema = yup.object().shape({
	person: yup.object().shape({
		label: yup.string().required(),
		value: yup.string().required(),
	}),
	totalValue: yup.number().typeError('Valor inválido').positive('Valor inválido').required('Campo obrigatório'),
});

export type ShareExpenseFormFields = InferType<typeof sharePeopleExpenseSchema>;
