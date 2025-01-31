export enum InputMasks {
	Cnpj = '99.999.999/9999-99',
	Cpf = '999.999.999-99',
	Cep = '99999-999',
	Tel = '(99) 9999-9999',
	Phone = '(99) 99999-9999',
}

export const removeInputMasks = {
	removeCNPJMask: (value: string) => value.replace(/[^\d]+/g, ''),
	removeCPFMask: (value: string) => value.replace(/[^\d]+/g, ''),
	removeCEPMask: (value: string) => value.replace(/[^\d]+/g, ''),
	removeTELMask: (value: string) => value.replace(/[^\d]+/g, ''),
	removePHONEMask: (value: string) => value.replace(/[^\d]+/g, ''),
	removeCurrencyMask: (value: string) => value.replace(/[^\d]+/g, ''),
	removePercentageMask: (value: string) => value.replace(/[^\d]+/g, ''),
};
