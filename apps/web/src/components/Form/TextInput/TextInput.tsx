import { forwardRef } from 'react';
import { IconProps, WarningCircle } from 'phosphor-react';

import { Container, BaseInputStyleContainer, Error, Prefix } from './TextInput.styles';

export interface BaseInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	icon?: React.ComponentType<IconProps>;
	error?: string;
	prefix?: string;
	size?: 'sm' | 'md';
}

export const TextInput = forwardRef<HTMLInputElement, BaseInputProps>(function TextInput(
	{ icon: Icon, id, error, prefix, disabled, width, size = 'md', className, ...rest },
	ref,
) {
	return (
		<Container className={className}>
			<BaseInputStyleContainer className={className} hasError={!!error} isDisabled={disabled} size={size}>
				{!!Icon && <Icon />}
				{prefix && <Prefix>{prefix}</Prefix>}
				<input ref={ref} {...rest} disabled={disabled} />
			</BaseInputStyleContainer>

			{!!error && (
				<Error>
					<WarningCircle />
					{error}
				</Error>
			)}
		</Container>
	);
});
