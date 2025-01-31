import * as yup from 'yup';

export const sharePeopleFormSchema = yup.object().shape({
	name: yup.string().label('Nome').required(),
	whatsapp: yup.string().label('Whatsapp').required(),
	betterDayTosendInvoice: yup
		.object()
		.label('Dia para enviar o fatura')
		.shape({
			label: yup.string().required(),
			value: yup.string().required(),
		})
		.required(),
});

export type SharePeopleFormType = yup.InferType<typeof sharePeopleFormSchema>;
