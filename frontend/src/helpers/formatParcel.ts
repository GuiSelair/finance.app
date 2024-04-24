export function formatParcel(current = 1, total = 1) {
	return `${String(current).padStart(2, '0')} / ${String(total).padStart(
		2,
		'0',
	)}`;
}
