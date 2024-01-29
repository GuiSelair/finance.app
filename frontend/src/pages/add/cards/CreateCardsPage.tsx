import React from 'react';

import { LayoutBox } from '@/components/LayoutBox';
import { ActionButtons, Column, InputLabel, Row, Select, TextInput } from '@/components/Form';

import { RegisterCardsForm, CreditCardIcon } from './styles';

export default function CreateCardsPage() {
	return (
		<LayoutBox title='Novo cartão'>
			<RegisterCardsForm>
				<Row>
					<InputLabel>
						Apelido:
						<TextInput placeholder='Insira o apelido do seu cartão aqui...' />
					</InputLabel>
				</Row>
				<Row flex={4} gap='1.5rem' padding='0 65px 0 0'>
					<Column flex={2}>
						<Row>
							<InputLabel>
								Bandeira:
								<Select
									placeholder='Selecione a bandeira do cartão...'
									options={[
										{ value: 'visa', label: 'Visa' },
										{ value: 'mastercard', label: 'Mastercard' },
										{ value: 'none', label: 'Sem bandeira' }
									]}
								/>
							</InputLabel>
							<CreditCardIcon />
						</Row>
					</Column>
					<Column flex={1}>
						<InputLabel>
							Data de melhor compra:
							<TextInput placeholder='Selecione a data...' type="date" />
						</InputLabel>
					</Column>
					<Column flex={1}>
						<InputLabel>
							Data de vencimento:
							<TextInput placeholder='Selecione a data...' type="date" />
						</InputLabel>
					</Column>
				</Row>
				<Row>
					<Column>
						<InputLabel>
							Limite do cartão:
							<TextInput prefix='R$' type="number" placeholder='1000' />
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
