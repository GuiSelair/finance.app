import { ButtonsContainer, CancelButton, SubmitButton } from './styles'


interface ActionButtonsProps {
	handleCancel: () => void;
	submitButtonText: string;
}

export function ActionButtons({ handleCancel, submitButtonText }: ActionButtonsProps) {
	return (
		<ButtonsContainer>
			<CancelButton type="button" onClick={handleCancel}>
				Cancelar
			</CancelButton>
			<SubmitButton type="submit">
				{submitButtonText}
			</SubmitButton>
		</ButtonsContainer>
	)
}
