export function isSubmitShortcut(event: KeyboardEvent): boolean {
	return (event.ctrlKey || event.metaKey) && event.key === 'Enter';
}

export function getSubmitShortcutLabel(): string {
	if (typeof navigator === 'undefined') {
		return 'Ctrl+Enter';
	}

	const isAppleDevice = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);

	return isAppleDevice ? '⌘+Enter' : 'Ctrl+Enter';
}
