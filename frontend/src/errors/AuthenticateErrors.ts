// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthenticateErrors {
	static EmailOrPasswordIncorrect() {
		return 'Email e/ou senha incorretos...';
	}

	static UnexpectedError() {
		return 'Erro ao realizar seu login... 😔';
	}
}
