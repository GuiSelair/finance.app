import * as Yup from 'yup';
import type { InferType } from 'yup';

export const loginFormSchema = Yup.object().shape({
	email: Yup.string()
		.email('Adicione um email válido.')
		.required('Campo obrigatório'),
	password: Yup.string()
		.min(6, 'A senha deve ter pelo menos 6 caracteres')
		.required('Campo obrigatório'),
});

export type LoginFieldsType = InferType<typeof loginFormSchema>;
