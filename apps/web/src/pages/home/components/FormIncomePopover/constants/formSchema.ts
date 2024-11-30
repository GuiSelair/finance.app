import * as yup from 'yup';
import type { InferType } from 'yup';

const invalidField = 'Campo Inválido';
const requiredField = 'Campo Obrigatório';

export const formIncomeSchema = yup.object().shape({
	income: yup.number().typeError(requiredField).min(0, invalidField).required(invalidField),
});

export type FormIncomeSchema = InferType<typeof formIncomeSchema>;
