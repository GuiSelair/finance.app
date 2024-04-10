import { useState, forwardRef } from 'react';
import { Eye, EyeSlash, IconProps, WarningCircle } from 'phosphor-react';

import {
	BaseInputStyleContainer,
	Error,
	Container,
} from '../TextInput/TextInput.styles';
import { HiddenButton } from './PasswordInput.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ComponentType<IconProps>;
	error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
	function PasswordInput({ icon: Icon, type, id, error, ...rest }, ref) {
		const [isPasswordVisible, setIsPasswordVisible] = useState(false);

		const customType = isPasswordVisible ? 'text' : 'password';
		const isPasswordInput = type === 'password';

		const handleToggleViewPassword = () => {
			setIsPasswordVisible(old => !old);
		};

		return (
			<Container>
				<BaseInputStyleContainer hasError={!!error}>
					{!!Icon && <Icon />}

					<input
						ref={ref}
						type={isPasswordInput ? customType : type}
						id={id}
						{...rest}
					/>

					{isPasswordInput && (
						<HiddenButton
							type="button"
							onClick={handleToggleViewPassword}
							title={isPasswordVisible ? 'Esconder senha' : 'Exibir senha'}
						>
							{isPasswordVisible ? <EyeSlash /> : <Eye />}
						</HiddenButton>
					)}
				</BaseInputStyleContainer>

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
