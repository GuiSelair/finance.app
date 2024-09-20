import * as Yup from 'yup';
import type { InferType } from 'yup';

export const loginFormSchema = Yup.object().shape({
	email: Yup.string().required('Campo obrigatório'),
	password: Yup.string().required('Campo obrigatório'),
});

export type LoginFieldsType = InferType<typeof loginFormSchema>;
