import axios, { AxiosInstance } from 'axios';
import { HTTPConfigProps, HTTPClientProps, HTTPClientResponse } from '../interface';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 4000,
});

class AxiosHTTPClient implements HTTPClientProps {
	constructor(private readonly api: AxiosInstance) {}

	applyAuthenticationToken(authenticationToken: string) {
		this.api.defaults.headers.Authorization = `Bearer ${authenticationToken}`;
	}

	async get<T>(url: string, config: Omit<HTTPConfigProps, 'body'> = {}): Promise<HTTPClientResponse<T>> {
		const response = await this.api.get<T>(url, {
			params: config.params,
			headers: config.headers,
		});

		return {
			data: response.data,
			status: response.status,
		};
	}

	async post<T>(url: string, config: HTTPConfigProps): Promise<HTTPClientResponse<T>> {
		const response = await this.api.post<T>(url, config.body, {
			headers: config.headers,
			params: config.params,
		});

		return {
			data: response.data,
			status: response.status,
		};
	}

	async put<T>(url: string, config: HTTPConfigProps): Promise<HTTPClientResponse<T>> {
		const response = await this.api.put(url, config.body, {
			params: config.params,
			headers: config.headers,
		});

		return {
			data: response.data,
			status: response.status,
		};
	}

	async delete<T>(url: string, config: Omit<HTTPConfigProps, 'body'> = {}): Promise<HTTPClientResponse<T>> {
		const response = await this.api.delete(url, {
			params: config.params,
			headers: config.headers,
		});

		return {
			data: response.data,
			status: response.status,
		};
	}
}

export default new AxiosHTTPClient(api);
