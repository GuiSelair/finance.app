// Declaração meramente documental para auto-complete e validação de variáveis de ambiente acessadas via process.env
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_LOCALSTORAGE_PREFIX_KEY?: string;
			NEXT_PUBLIC_API_BASE_URL: string;
		}
	}
}

export {};
