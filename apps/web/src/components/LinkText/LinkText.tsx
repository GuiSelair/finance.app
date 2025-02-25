import Link, { LinkProps } from 'next/link';
import { ArrowSquareOut as ArrowSquareOutIcon } from 'phosphor-react';

import { LinkTextContainer } from './LinkText.styles';

interface LinkTextProps extends LinkProps {
	text: string;
}

export function LinkText({ text, ...rest }: LinkTextProps) {
	return (
		<Link prefetch={false} {...rest}>
			<LinkTextContainer>
				{text}
				<ArrowSquareOutIcon />
			</LinkTextContainer>
		</Link>
	);
}
