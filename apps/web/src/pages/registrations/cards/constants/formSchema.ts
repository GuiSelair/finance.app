import * as Yup from 'yup';
import type { InferType } from 'yup';

export const createCardFormSchema = Yup.object().shape({
	name: Yup.string().required('Campo obrigatório'),
	flag: Yup.object()
		.shape({
			label: Yup.string().required(),
			value: Yup.string().required(),
		})
		.required('Campo obrigatório'),
	creditLimit: Yup.number().positive(),
	dueDay: Yup.number().positive().required('Campo obrigatório'),
	turningDay: Yup.number().positive().required('Campo obrigatório'),
});

export type CreateCardFieldsType = InferType<typeof createCardFormSchema>;
