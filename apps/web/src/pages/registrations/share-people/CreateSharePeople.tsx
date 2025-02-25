import { ActionButtons, Flex, LayoutBox, SEO } from '@/components';
import { useCreateSharePeople } from './hooks/useCreateSharePeople';
import { FormSharePeople } from './FormSharePeople';

export default function CreateSharePeoplePage() {
	const { formMethods, handleCreateSharePeople } = useCreateSharePeople();

	return (
		<>
			<SEO title="Adicionar nova pessoa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Nova pessoa para compartilhar</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<Flex
						as={'form'}
						id="share-people-form-id"
						flexDirection="column"
						gap="1rem"
						onSubmit={formMethods.handleSubmit(data => handleCreateSharePeople(data))}
					>
						<FormSharePeople formMethods={formMethods} mode="create" />
					</Flex>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={() => {}} />
							<ActionButtons.Submit
								form="share-people-form-id"
								isLoading={formMethods.formState?.isSubmitting}
								spinnerConfig={{ mode: 'light', size: 'sm' }}
							>
								Criar pessoa
							</ActionButtons.Submit>
						</ActionButtons>
					</LayoutBox.FooterRightSide>
				</LayoutBox.Footer>
			</LayoutBox>
		</>
	);
}
