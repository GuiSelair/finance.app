import { SEO } from '@/components/SEO';
import { InputLabel, PasswordInput, TextInput } from '@/components/Form';

import { useLogin } from './hooks/useLogin';
import {
	LoginContainer,
	HighlightImageContainer,
	LoginFormContent,
	HeaderLogo,
	ResponsiveContainer,
	LoginContentCenter,
	LoginSubtitle,
	LoginTitle,
	LoginFormSubmitButton,
} from './Login.styles';

export default function LoginPage() {
	const { form, isAuthenticating } = useLogin();

	const { handleFormSubmit, register, validationErrors } = form;

	return (
		<>
			<SEO title="Faça seu login" />
			<LoginContainer>
				<LoginContentCenter>
					<ResponsiveContainer>
						<HeaderLogo>
							<strong>Finance</strong>.app
						</HeaderLogo>
						<LoginFormContent onSubmit={handleFormSubmit}>
							<LoginTitle>Faça seu login!</LoginTitle>
							<LoginSubtitle>
								Faça sua autenticação para começar a gerenciar suas despesas.
							</LoginSubtitle>

							<InputLabel>
								Email:
								<TextInput
									type="email"
									error={validationErrors?.email?.message}
									placeholder="Insira sua email"
									{...register('email')}
								/>
							</InputLabel>

							<InputLabel>
								Senha:
								<PasswordInput
									type="password"
									id="password"
									error={validationErrors?.password?.message}
									placeholder="Insira sua senha"
									{...register('password')}
								/>
							</InputLabel>

							<LoginFormSubmitButton
								type="submit"
								isLoading={isAuthenticating}
								variant="solid"
								size="lg"
								spinnerConfig={{ mode: 'light', size: 'md' }}
								fullWidth
							>
								Entrar
							</LoginFormSubmitButton>
						</LoginFormContent>
					</ResponsiveContainer>
				</LoginContentCenter>
				<HighlightImageContainer />
			</LoginContainer>
		</>
	);
}

LoginPage.notUseLayout = true;
