import React from 'react';
import { ArrowSquareOut } from 'phosphor-react';
import Link from 'next/link';

import { LayoutBox } from '@/components/shared/LayoutBox';
import { TextInput, Select, InputLabel } from '@/components/shared/Form';

import {
	RegisterExpenseTitle,
	RegisterExpenseForm,
	Row,
	Column,
	FieldDescription,
	Divider,
	CardDetails,
	ValueInput,
} from '@/styles/pages/add/expense.style';

export default function CreateExpenses() {
	return (
		<LayoutBox>
			<RegisterExpenseTitle>Nova despesa</RegisterExpenseTitle>

			<RegisterExpenseForm>
				<Row>
					<InputLabel>
						Nome:
						<TextInput placeholder="Insira o nome de sua despesa aqui" />
					</InputLabel>
				</Row>
				<Row margin="0.5rem 0 0 0">
					<Column width="418px">
						<InputLabel>
							Meio de pagamento:
							<div>
								<Select
									placeholder="Selecione o meio de pagamento"
									options={[]}
								/>
								<FieldDescription>
									Não encontrou o meio de pagamento?
									<strong>
										<Link href={'/add/cards'} prefetch={false}>
											Crie um aqui!
											<ArrowSquareOut />
										</Link>
									</strong>
								</FieldDescription>
							</div>
						</InputLabel>
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
	);
}
