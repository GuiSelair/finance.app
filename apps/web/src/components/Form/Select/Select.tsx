import { ComponentProps, ElementRef, forwardRef } from 'react';
import ReactSelect, { OptionsOrGroups } from 'react-select';

import { defaultTheme } from '@/styles/theme/default';

export interface SelectOptionProps {
	label: string;
	value: string;
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

export const Select = forwardRef<ElementRef<typeof ReactSelect>, SelectProps>(
	function Select({ width, ...rest }: SelectProps, ref) {
		return (
			<ReactSelect
				ref={ref}
				styles={{
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					container(base) {
						return {
							...base,
							width,
						};
					},
					indicatorSeparator() {
						return {
							display: 'none',
						};
					},
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
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
	},
);
