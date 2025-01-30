import { ActionButtons, Button, Flex, Grid, InputLabel, LayoutBox, Select, SEO, TextInput } from '@/components';
import { betterDaysToSendInvoiceOptions } from './constants/betterDaysToSendInvoiceOptions';

export default function SharePeople() {
	return (
		<>
			<SEO title="Adicionar nova pessoa" />
			<LayoutBox>
				<LayoutBox.Header>
					<LayoutBox.HeaderTitle>Nova pessoa para compartilhar</LayoutBox.HeaderTitle>
				</LayoutBox.Header>
				<LayoutBox.Content>
					<Flex as={'form'} flexDirection="column" gap="1rem">
						<InputLabel>
							Nome:
							<TextInput placeholder="Insira o nome da pessoa aqui" />
						</InputLabel>
						<Grid gap="1.5rem" gridTemplateColumns="minmax(300px, 1fr) minmax(300px, 1fr)">
							<InputLabel>
								Whatsapp:
								<TextInput placeholder="Whatsapp" />
							</InputLabel>
							<InputLabel>
								Melhor dia para enviar fatura:
								<Select placeholder="Selecione o melhor dia" options={betterDaysToSendInvoiceOptions} />
							</InputLabel>
						</Grid>
					</Flex>
				</LayoutBox.Content>
				<LayoutBox.Footer>
					<LayoutBox.FooterRightSide>
						<ActionButtons>
							<ActionButtons.Cancel onClick={() => {}} />
							<ActionButtons.Submit
								// isLoading={isCreatingCard}
								// onClick={handleSubmit(handleCreateCard)}
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
