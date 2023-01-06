import Head from 'next/head';
import { Eye, EyeSlash, WarningCircle } from 'phosphor-react';
import { useState } from 'react';
import { SEO } from '../../SEO';

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
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const customType = isPasswordVisible ? 'text' : 'password' 
	const isPasswordInput = type === 'password';

	const handleToggleViewPassword = () => {
		setIsPasswordVisible(old => !old)
	}

	const handleInputFocus = () => {
		setIsFocused(true)
	}

	const handleInputBlur = () => {
		setIsFocused(false)
	}

	return (
		<>
			<SEO title='Faça seu login' />
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
						type={isPasswordInput ? customType : type} 
						id={id}
						onFocus={handleInputFocus}
						onBlur={handleInputBlur}
						{...rest} 
					/>
					
					{isPasswordInput && (
						<button 
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
		</>
	);
}
