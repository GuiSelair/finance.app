import * as Yup from 'yup';
import type { InferType } from 'yup';

const requiredFieldMessage = 'Campo obrigatório';
export const createFormExpenseFormSchema = (isEditMode = false) => {
	return Yup.object().shape({
		name: Yup.string().required(requiredFieldMessage),
		purchaseDate: Yup.string().required(requiredFieldMessage),
		expenseDate: Yup.string().required(requiredFieldMessage),
		category: Yup.string(),
		totalValue: Yup.number().required(requiredFieldMessage),
		parcelQuantity: Yup.number().required(requiredFieldMessage),
		paymentMethod: Yup.object()
			.shape({
				label: Yup.string().required(),
				value: Yup.string().required(),
			})
			.required(requiredFieldMessage),
		isRecurring: Yup.boolean(),
		parcelValue: isEditMode ? Yup.number().required(requiredFieldMessage) : Yup.number(),
	});
};

export type FormExpenseFieldsType = InferType<ReturnType<typeof createFormExpenseFormSchema>>;
