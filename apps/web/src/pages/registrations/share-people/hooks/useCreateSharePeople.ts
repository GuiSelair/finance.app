import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { sharePeopleFormSchema, SharePeopleFormType } from '../constants/formSchema';
import { betterDaysToSendInvoiceOptions } from '../constants/betterDaysToSendInvoiceOptions';
import { useCreateSharePeopleApi } from '@/hooks/api/sharePeople/useCreateSharePeople.api';
import { useRouter } from 'next/navigation';

export function useCreateSharePeople() {
	const router = useRouter();
	const { mutateAsync: handleCreateSharePeople } = useCreateSharePeopleApi();

	const formMethods = useForm<SharePeopleFormType>({
		resolver: yupResolver(sharePeopleFormSchema),
		defaultValues: {
			betterDayToSendInvoice: betterDaysToSendInvoiceOptions[1],
		},
	});

	function handleCancel() {
		router.push('/dividers/share-people');
	}

	return {
		formMethods,
		handleCreateSharePeople,
		handleCancel,
	};
}
