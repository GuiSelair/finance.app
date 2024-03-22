/**
 * Função responsável por decodifica um token JWT e retorna o payload.
 * @param token - O token JWT a ser decodificado.
 * @returns O payload decodificado ou null se a decodificação falhar.
 */
function decode<T>(token: string): T | null {
	try {
		return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
	} catch (e) {
		return null;
	}
}

/**
 * Função responsável por verifica se um token é válido.
 * @param token - O token a ser verificado.
 * @returns Retorna true se o token for válido, false caso contrário.
 */
function isTokenValid(token: string): boolean {
	const decodedToken = decode(token);
	if (!decodedToken) return false;
	return true;
}

export const JWT = {
	decode,
	isTokenValid,
};
