import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { sharePeopleFormSchema, SharePeopleFormType } from '../constants/formSchema';
import { betterDaysToSendInvoiceOptions } from '../constants/betterDaysToSendInvoiceOptions';
import { useCreateSharePeopleApi } from '@/hooks/api/sharePeople/useCreateSharePeople.api';

export function useCreateSharePeople() {
	const { mutateAsync: handleCreateSharePeople } = useCreateSharePeopleApi();

	const formMethods = useForm<SharePeopleFormType>({
		resolver: yupResolver(sharePeopleFormSchema),
		defaultValues: {
			betterDayToSendInvoice: betterDaysToSendInvoiceOptions[1],
		},
	});
	console.log(formMethods.formState.errors);

	return {
		formMethods,
		handleCreateSharePeople,
	};
}
