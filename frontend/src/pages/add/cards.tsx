import React from 'react';

import { LayoutBox } from '@/components/shared/LayoutBox';
import { RegisterCardsForm } from '@/styles/pages/add/cards.style';
import { ActionButtons, Column, InputLabel, Row, TextInput } from '@/components/shared/Form';

export default function CreateCardsPage() {
	return (
		<LayoutBox title='Novo cartão'>
			<RegisterCardsForm>
				<Row>
					<InputLabel>
						Nome:
						<TextInput placeholder='Insira o apelido do seru cartão aqui...' />
					</InputLabel>
				</Row>
				<Row flex={4} gap='1.5rem' padding='0 65px 0 0'>
					<Column flex={2}>
						<InputLabel>
							Bandeira:
							<TextInput placeholder='Insira a bandeira do seu cartão aqui...' />
						</InputLabel>	
					</Column>
					<Column flex={1}>
						<InputLabel>
							Data de melhor compra:
							<TextInput placeholder='Insira o número do seu cartão aqui...' />
						</InputLabel>
					</Column>
					<Column flex={1}>
						<InputLabel>
							Data de vencimento:
							<TextInput placeholder='Insira o número do seu cartão aqui...' />
						</InputLabel>
					</Column>
				</Row>
				<Row>
					<Column>
						<InputLabel>
							Limite do cartão:
							<TextInput prefix='R$' />
						</InputLabel>
					</Column>
				</Row>

				<Row margin='70px 0 0 0'>
					<ActionButtons>
						<ActionButtons.Cancel/>
						<ActionButtons.Submit>
							Criar cartão
						</ActionButtons.Submit>
					</ActionButtons>
				</Row>
			</RegisterCardsForm>
		</LayoutBox>
	);
}
