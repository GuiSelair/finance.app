import { PropsWithChildren } from 'react';
import {
	LayoutBoxContainer,
	LayoutBoxContent,
	LayoutBoxFooter,
	LayoutBoxFooterLeftSide,
	LayoutBoxFooterRightSide,
	LayoutBoxHeader,
	LayoutBoxHeaderButtonsContainer,
	LayoutBoxTitle,
} from './LayoutBox.styles';

export function LayoutBox({ children }: Readonly<PropsWithChildren<{}>>) {
	return <LayoutBoxContainer>{children}</LayoutBoxContainer>;
}

LayoutBox.Header = LayoutBoxHeader;
LayoutBox.HeaderTitle = LayoutBoxTitle;
LayoutBox.HeaderButtonsContainer = LayoutBoxHeaderButtonsContainer;
LayoutBox.Content = LayoutBoxContent;
LayoutBox.Footer = LayoutBoxFooter;
LayoutBox.FooterLeftSide = LayoutBoxFooterLeftSide;
LayoutBox.FooterRightSide = LayoutBoxFooterRightSide;
