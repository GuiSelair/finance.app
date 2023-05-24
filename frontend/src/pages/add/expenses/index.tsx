import React from 'react';
import { ArrowSquareOut } from 'phosphor-react';
import Link from 'next/link';

import { LayoutBox } from '@/components/shared/LayoutBox';
import { Input, Select } from '@/components/shared/Form';

import {
	RegisterExpenseTitle,
	RegisterExpenseForm,
	Row,
	Column,
	FieldDescription,
	FieldLabel,
	Divider,
	CardDetails,
} from '@/styles/pages/add/expense.style';

export default function CreateExpenses() {
	return (
		<LayoutBox>
			<RegisterExpenseTitle>Nova despesa</RegisterExpenseTitle>

			<RegisterExpenseForm>
				<Row>
					<Input
						label="Nome:"
						placeholder="Insira o nome de sua despesa aqui"
					/>
				</Row>
				<Row margin="0.5rem 0 0 0">
					<Column width="418px">
						<FieldLabel>
							<span>Meio de pagamento:</span>
							<Select
								placeholder="Selecione o meio de pagamento"
								options={[]}
							/>
						</FieldLabel>
						<FieldDescription>
							Não encontrou o meio de pagamento?
							<strong>
								<Link href={'/add/cards'} prefetch={false}>
									Crie um aqui!
									<ArrowSquareOut />
								</Link>
							</strong>
						</FieldDescription>
					</Column>
					<CardDetails>
						<span>Detalhes sobre meio de pagamento:</span>
						<Row>
							<p>
								Cartão: <strong>Nubank Dani</strong> | Esta despesa entrará na
								fatura <strong>deste mês (12/2022)</strong>
							</p>
						</Row>
					</CardDetails>
				</Row>
				<Row margin="1rem 0 0 0">
					<Input
						label="Categoria:"
						placeholder="Insira a categoria de sua despesa aqui..."
					/>
				</Row>
				<Divider />
				<Row>
					<Column width="480px">
						<Row>
							<Input label="Valor total:" placeholder="R$" />
							<Input label="Parcelas:" placeholder="R$" />
							<Input label="Valor por parcela:" placeholder="R$" disabled />
						</Row>
					</Column>
				</Row>
			</RegisterExpenseForm>
		</LayoutBox>
	);
}
