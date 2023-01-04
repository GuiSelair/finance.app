import { EyeSlash, WarningCircle } from 'phosphor-react';
import { useState } from 'react';

import {
	Container,
	LabelContainer,
	InputContainer,
	Description,
	Error,
} from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	icon?: React.ElementType;
	description?: string;
	error?: string;
}

export function Input({
	label,
	icon: Icon,
	type,
	id,
	description,
	error,
	...rest
}: InputProps) {
	const [isPasswordType, setIsPasswordType] = useState(
		() => type === 'password',
	);

	return (
		<Container>
			{!!label && (
				<LabelContainer>
					<div>
						<label htmlFor={id}>{label}</label>
					</div>
				</LabelContainer>
			)}

			<InputContainer hasError={!!error}>
				{!!Icon && <Icon />}
				<input type={type} id={id} {...rest} />
				{isPasswordType && (
					<button>
						<EyeSlash />
					</button>
				)}
			</InputContainer>

			{!!description && <Description>{description}</Description>}
			{!!error && (
				<Error>
					<WarningCircle />
					{error}
				</Error>
			)}
		</Container>
	);
}
