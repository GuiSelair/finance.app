import { Portal, type DropdownMenuContentProps, type DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';

import { DropmenuContentContainer, DropmenuItemContainer } from './Dropmenu.styles';

export function DropmenuContent(props: DropdownMenuContentProps) {
	return (
		<Portal>
			<DropmenuContentContainer {...props} />
		</Portal>
	);
}

export function DropmenuItem(props: DropdownMenuItemProps) {
	return <DropmenuItemContainer {...props} />;
}
