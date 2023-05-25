import { ComponentProps } from 'react';
import ReactSelect, { OptionsOrGroups } from 'react-select';

import { defaultTheme } from '@/styles/theme/default';

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
				control: (baseStyles, state) => ({
					...baseStyles,
					boxShadow: state.isFocused
						? `0 0 0 1px ${defaultTheme.colors.green500}`
						: 'none',
					borderColor: state.isFocused
						? defaultTheme.colors.green500
						: 'lightgray',
					'&:hover': {
						borderColor: state.isFocused
							? defaultTheme.colors.green500
							: 'lightgray',
					},
				}),
			}}
			noOptionsMessage={() => 'Nenhuma opção encontrada'}
			{...rest}
		/>
	);
}
