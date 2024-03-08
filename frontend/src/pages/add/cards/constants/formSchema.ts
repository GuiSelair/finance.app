import * as Yup from 'yup'

export const createCardFormSchema = Yup.object().shape({
	name: Yup.string().required('Campo obrigatório'),
	flag: Yup.object().required('Campo obrigatório'),
	creditLimit: Yup.number().optional(),
	dueDay: Yup.number().required('Campo obrigatório'),
	turningDay: Yup.number().required('Campo obrigatório'),
})

export interface ICreateCardFields {
	name: string;
	flag: { value: string; label: string };
	creditLimit: number;
	dueDay: number;
	turningDay: number;
}