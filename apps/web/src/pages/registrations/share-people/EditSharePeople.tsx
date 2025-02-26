import { ActionButtons, Flex, LayoutBox, SEO, Spinner } from '@/components';
import { FormSharePeople } from './FormSharePeople';
import { useEditSharePeople } from './hooks/useEditSharePeople';

export default function EditSharePeoplePage() {
	const { formMethods, handleEditSharePeople, isFindingPerson, handleCancel } = useEditSharePeople();

	if (isFindingPerson) {
		return (
			<>
				<SEO title="Edição de pessoa divisora" />
				<LayoutBox>
					<LayoutBox.Header>
						<LayoutBox.HeaderTitle>Edição de pessoa divisora</LayoutBox.HeaderTitle>
					</LayoutBox.Header>
					<LayoutBox.Content>
						<Flex justifyContent="center" alignItems="center" width="100%" gap="8px">
							<Spinner size="sm" />
							<span>Buscando informações da pessoa...</span>
						</Flex>
					</LayoutBox.Content>
				</LayoutBox>
			</>
		);
	}

	return (
		<>
			<SEO title="Edição de pessoa divisora" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Edição de pessoa divisora</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<Flex
						as={'form'}
						id="share-people-form-id"
						flexDirection="column"
						gap="1rem"
						onSubmit={formMethods.handleSubmit(data => handleEditSharePeople(data))}
					>
						<FormSharePeople formMethods={formMethods} mode="edit" />
					</Flex>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={handleCancel} isLoading={formMethods.formState?.isSubmitting} />
							<ActionButtons.Submit
								form="share-people-form-id"
								isLoading={formMethods.formState?.isSubmitting}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Editar pessoa
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</>
	);
}
