import { LayoutBoxContainer, LayoutBoxTitle } from "./styles";

type LayoutBoxProps = {
	title?: string;
	children: React.ReactNode;
}

export function LayoutBox({ children, title }: LayoutBoxProps) {
	const hasTitle = !!title;

	return (
		<LayoutBoxContainer>
			{hasTitle && <LayoutBoxTitle>{title}</LayoutBoxTitle>}
			{children}
		</LayoutBoxContainer>
	)
}
