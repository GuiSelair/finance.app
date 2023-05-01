import { ComponentProps } from 'react';
import ReactSelect, { OptionsOrGroups } from 'react-select';

export interface SelectOptionProps {
	label: string | number;
	value: string | number;
}

export interface SelectGroupOptionsProps {
	label: string;
	options: SelectOptionProps[];
}

export type SelectOptions = OptionsOrGroups<
	SelectOptionProps,
	SelectGroupOptionsProps
>;

interface SelectProps extends ComponentProps<typeof ReactSelect> {
	width?: string;
	options: SelectOptions;
}

export function Select({ width, ...rest }: SelectProps) {
	return (
		<ReactSelect
			styles={{
				container(base, props) {
					return {
						...base,
						width,
					};
				},
				indicatorSeparator(base, props) {
					return {
						display: 'none',
					};
				},
			}}
			noOptionsMessage={() => 'Nenhuma opção encontrada'}
			{...rest}
		/>
	);
}
