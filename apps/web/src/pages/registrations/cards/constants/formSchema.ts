import * as Yup from 'yup';
import type { InferType } from 'yup';
import { AVAILABLE_CARDS_OPTIONS } from './availableCardsOptions';

export const createCardFormSchema = Yup.object().shape({
	name: Yup.string().required('Campo obrigatório'),
	flag: Yup.object()
		.shape({
			label: Yup.string().required(),
			value: Yup.string()
				.oneOf(
					AVAILABLE_CARDS_OPTIONS.map(option => option.value),
					'Campo inválido',
				)
				.required(),
		})
		.required('Campo obrigatório'),
	dueDay: Yup.number().positive('Campo inválido').required('Campo obrigatório'),
	turningDay: Yup.number().positive('Campo inválido').required('Campo obrigatório'),
});

export type CreateCardFieldsType = InferType<typeof createCardFormSchema>;
