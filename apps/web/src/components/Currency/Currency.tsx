import { Text, type TextProps } from '../Text';

interface CurrencyProps extends TextProps {
	value: number;
	options?: Intl.NumberFormatOptions;
}

export function Currency({ value, options, ...rest }: CurrencyProps) {
	const formattedValue = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		...options,
	}).format(value);

	return <Text {...rest}>{formattedValue}</Text>;
}
