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
} from '@/styles/pages/add/expense.style';

export default function CreateExpenses() {
	return (
		<LayoutBox>
			<RegisterExpenseTitle>Nova despesa</RegisterExpenseTitle>

			<RegisterExpenseForm>
				<Input label="Nome:" placeholder="Insira o nome de sua despesa aqui" />
				<Row margin="0.8rem 1.5rem 0 0">
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
								<Link href={'/add/card'} prefetch={false}>
									Crie um aqui!
									<ArrowSquareOut />
								</Link>
							</strong>
						</FieldDescription>
					</Column>
				</Row>
			</RegisterExpenseForm>
		</LayoutBox>
	);
}
