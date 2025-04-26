import { Flex, Grid, InputLabel, Select } from '@/components';
import { Controller, useFormContext } from 'react-hook-form';

import { FormExpenseFieldsType } from '../../constants/formSchema';

export function ShareExpense() {
	const { control } = useFormContext<FormExpenseFieldsType>();

	return (
		<Grid gridTemplateColumns="1fr 1fr">
			<Flex flexDirection="column">
				<InputLabel>
					Meio de pagamento:
					{/* <div>
						<Controller
							name=""
							control={control}
							render={({ field }) => <Select placeholder="Selecione o meio de pagamento" options={[]} {...field} />}
						/>
					</div> */}
				</InputLabel>
			</Flex>
		</Grid>
	);
}
