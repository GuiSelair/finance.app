import React from 'react';

import { LayoutBox } from '@/components/shared/LayoutBox';
import { Input } from '@/components/shared/Form/Input';

import {
	RegisterExpenseTitle,
	RegisterExpenseForm,
} from '@/styles/pages/add/expense.styles';

export default function CreateExpenses() {
	return (
		<LayoutBox>
			<RegisterExpenseTitle>Nova despesa</RegisterExpenseTitle>

			<RegisterExpenseForm>
				<Input label="Nome:" placeholder="Insira o nome de sua despesa aqui" />
				<div className="inline">
					<Input
						label="Nome:"
						placeholder="Insira o nome de sua despesa aqui"
					/>
					<Input
						label="Nome:"
						placeholder="Insira o nome de sua despesa aqui"
					/>
				</div>
			</RegisterExpenseForm>
		</LayoutBox>
	);
}
