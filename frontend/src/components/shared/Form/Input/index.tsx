import { useState, forwardRef, RefObject } from 'react';
import { Eye, EyeSlash, WarningCircle } from 'phosphor-react';

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

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, icon: Icon, type, id, description, error, ...rest }, ref) => {
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);
		const [isFocused, setIsFocused] = useState(false);

		const customType = isPasswordVisible ? 'text' : 'password';
		const isPasswordInput = type === 'password';

		const handleToggleViewPassword = () => {
			setIsPasswordVisible(old => !old);
		};

		const handleInputFocus = () => {
			setIsFocused(true);
		};

		const handleInputBlur = () => {
			setIsFocused(false);
		};

		return (
			<Container>
				{!!label && (
					<LabelContainer>
						<div>
							<label htmlFor={id}>{label}</label>
						</div>
					</LabelContainer>
				)}

				<InputContainer hasError={!!error} hasFocus={isFocused}>
					{!!Icon && <Icon />}

					<input
						ref={ref}
						type={isPasswordInput ? customType : type}
						id={id}
						onFocus={handleInputFocus}
						onBlurCapture={handleInputBlur}
						{...rest}
					/>

					{isPasswordInput && (
						<button
							type="button"
							onClick={handleToggleViewPassword}
							title={isPasswordVisible ? 'Esconder senha' : 'Exibir senha'}
						>
							{isPasswordVisible ? <EyeSlash /> : <Eye />}
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
	},
);

Input.displayName = 'Input';
