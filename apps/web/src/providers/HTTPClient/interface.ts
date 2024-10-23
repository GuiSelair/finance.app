export interface HTTPConfigProps {
	body: object;
	params?: object;
	headers?: object;
}

export interface HTTPClientResponse<R> {
	data: R;
	status: number;
}

export interface HTTPClientProps {
	applyAuthenticationToken: (authenticationToken: string) => void;
	get: <T>(url: string, config: Omit<HTTPConfigProps, 'body'>) => Promise<HTTPClientResponse<T>>;
	post: <T>(url: string, config: HTTPConfigProps) => Promise<HTTPClientResponse<T>>;
	put: <T>(url: string, config: HTTPConfigProps) => Promise<HTTPClientResponse<T>>;
	delete: <T>(url: string, config: HTTPConfigProps) => Promise<HTTPClientResponse<T>>;
}
