import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { sharePeopleFormSchema, SharePeopleFormType } from '../constants/formSchema';
import { betterDaysToSendInvoiceOptions } from '../constants/betterDaysToSendInvoiceOptions';
import { useEditSharePeopleApi } from '@/hooks/api/sharePeople/useEditSharePeople.api';
import { useFindSharePeopleApi } from '@/hooks/api/sharePeople/useFindSharePeople.api';
import { useParams, useRouter } from 'next/navigation';

export function useEditSharePeople() {
	const router = useRouter();
	const params = useParams<{ id: string }>();
	const sharePeopleId = Number(params?.id);
	const { mutateAsync: editSharePeopleFn } = useEditSharePeopleApi();
	const { data: sharePersonContent, isLoading } = useFindSharePeopleApi({ sharePeopleId });

	// @ts-expect-error - Desabilita erro para preencher com valores default
	const formMethods = useForm<SharePeopleFormType>({
		resolver: yupResolver(sharePeopleFormSchema),
		...(!!sharePersonContent && {
			values: {
				betterDayToSendInvoice: betterDaysToSendInvoiceOptions.find(
					day => day.value === String(sharePersonContent?.dayToSendInvoice),
				),
				name: sharePersonContent?.name,
				whatsapp: sharePersonContent?.whatsapp,
			},
		}),
	});

	function handleCancel() {
		router.push('/dividers/share-people');
	}

	async function handleEditSharePeople(formData: SharePeopleFormType) {
		await editSharePeopleFn({ ...formData, id: sharePeopleId });
		router.push('/dividers/share-people');
	}

	return {
		formMethods,
		handleEditSharePeople,
		isFindingPerson: isLoading,
		handleCancel,
	};
}
