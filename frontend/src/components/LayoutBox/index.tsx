import { 
	LayoutBoxContainer, 
	LayoutBoxContent, 
	LayoutBoxFooter, 
	LayoutBoxFooterLeftSide, 
	LayoutBoxFooterRightSide, 
	LayoutBoxHeader, 
	LayoutBoxHeaderButtonsContainer, 
	LayoutBoxTitle
} from "./styles";

type LayoutBoxProps = {
	children: React.ReactNode;
}

export function LayoutBox({ children }: LayoutBoxProps) {
	return (
		<LayoutBoxContainer>
			{children}
		</LayoutBoxContainer>
	)
}

LayoutBox.Header = LayoutBoxHeader;
LayoutBox.HeaderTitle = LayoutBoxTitle;
LayoutBox.HeaderButtonsContainer = LayoutBoxHeaderButtonsContainer
LayoutBox.Content = LayoutBoxContent;
LayoutBox.Footer = LayoutBoxFooter;
LayoutBox.FooterLeftSide = LayoutBoxFooterLeftSide;
LayoutBox.FooterRightSide = LayoutBoxFooterRightSide;