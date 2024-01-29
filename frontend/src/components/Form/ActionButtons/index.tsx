import { ButtonsContainer, CancelButton, SubmitButton } from './styles'

export function ActionButtons({ children }: { children: React.ReactNode }) {
	return (
		<ButtonsContainer>
			{children}
		</ButtonsContainer>
	)
}

ActionButtons.Cancel = function ActionButtonsCancel(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<CancelButton type='button' {...props}>
			Cancelar
		</CancelButton>
	)
}

ActionButtons.Submit = function ActionButtonsSubmit({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<SubmitButton type='submit' {...rest}>
			{children}
		</SubmitButton>
	)
}