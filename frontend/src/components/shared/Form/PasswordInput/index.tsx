import { useState, forwardRef } from 'react';
import { Eye, EyeSlash, IconProps, WarningCircle } from 'phosphor-react';

import {
	Container,
	LabelContainer,
	InputContainer,
	Description,
	Error,
} from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ComponentType<IconProps>;
	error?: string;
	prefix?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
	({ icon: Icon, type, id, error, ...rest }, ref) => {
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);

		const customType = isPasswordVisible ? 'text' : 'password';
		const isPasswordInput = type === 'password';

		const handleToggleViewPassword = () => {
			setIsPasswordVisible(old => !old);
		};

		return (
			<Container>
				<InputContainer hasError={!!error}>
					{!!Icon && <Icon />}

					{prefix && <span>{prefix}</span>}
					<input
						ref={ref}
						type={isPasswordInput ? customType : type}
						id={id}
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

TextInput.displayName = 'Input';
