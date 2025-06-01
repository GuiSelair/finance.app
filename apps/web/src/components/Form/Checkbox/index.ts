import { Checkbox as CheckboxComponent, CheckboxIndicator, CheckboxLabel } from './Checkbox';

export const Checkbox = Object.assign(CheckboxComponent, {
	Indicator: CheckboxIndicator,
	Label: CheckboxLabel,
});
