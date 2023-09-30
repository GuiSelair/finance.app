import React from 'react';

import { LayoutBox } from '@/components/shared/LayoutBox';
import { TextInput, InputLabel } from '@/components/shared/Form';
import { SEO } from '@/components/shared/SEO';
import { PaymentMethodSelectionSection } from '@/components/pages/add/expenses/PaymentMethodSelection';

import {
	RegisterExpenseTitle,
	RegisterExpenseForm,
	Row,
	Column,
	Divider,
	ValueInput,
} from '@/styles/pages/add/expense.style';

export default function CreateExpenses() {
	return (
		<>
			<SEO title="Adicionar despesa"	/>
			<LayoutBox>
				<RegisterExpenseTitle>Nova despesa</RegisterExpenseTitle>

				<RegisterExpenseForm>
					<Row>
						<InputLabel>
							Nome:
							<TextInput placeholder="Insira o nome de sua despesa aqui" />
						</InputLabel>
					</Row>
					
					<PaymentMethodSelectionSection />

					<Row margin="1rem 0 0 0">
						<InputLabel>
							Categoria:
							<TextInput placeholder="Insira a categoria de sua despesa aqui..." />
						</InputLabel>
					</Row>
					<Divider />
					<Row margin="0 0 100px 0">
						<Column width="480px">
							<Row>
								<InputLabel>
									Valor total:
									<ValueInput prefix="R$" />
								</InputLabel>
								<InputLabel>
									Parcelas:
									<ValueInput />
								</InputLabel>
								<InputLabel>
									Valor por parcela:
									<ValueInput prefix="R$" disabled />
								</InputLabel>
							</Row>
						</Column>
					</Row>
				</RegisterExpenseForm>
			</LayoutBox>
		</>
	);
}
