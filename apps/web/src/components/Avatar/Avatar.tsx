import { AvatarContainer, AvatarFallback } from './Avatar.styles';

interface AvatarProps {
	name: string;
}

export function Avatar({ name }: AvatarProps) {
	const firstLettersRegex = /(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu;
	const twoFirstLettersOfFallback = name?.match(firstLettersRegex)?.slice(0, 2)?.join('').toUpperCase() || '';

	return (
		<AvatarContainer>
			<AvatarFallback>{twoFirstLettersOfFallback}</AvatarFallback>
		</AvatarContainer>
	);
}
