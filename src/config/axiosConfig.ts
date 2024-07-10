import { NavigateFunction } from "react-router-dom";

import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";

import { APP_CONFIG, APP_ROUTES, STORAGE_KEYS } from "@/config/appConfig";

export interface ApiCallOptions {
	method?: "get" | "post" | "put" | "delete" | "patch";
	endpoint: string;
	data?: FormData | Record<string, any>;
	navFunction?: NavigateFunction;
	params?: Record<string, unknown>;
	headers?: Record<string, string>;
}

export interface ApiErrorData {
	error: string;
	message: string;
	path: string;
	status: number;
	timestamp: string;
}

export const createAxiosInstance = ({
	navFunction,
	config,
}: {
	navFunction?: NavigateFunction;
	config?: AxiosRequestConfig;
}): AxiosInstance => {
	const userDetails = localStorage.getItem(
		STORAGE_KEYS.LOCAL_STORAGE.USER_DETAILS
	);

	const token = userDetails ? JSON.parse(userDetails).token : null;

	const axiosInstance = axios.create({
		headers: {
			...config?.headers,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
		},
		withCredentials: true,
		...config,
	});

	axiosInstance.interceptors.request.use(
		(config) => {
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			const noNetwork =
				error.isAxiosError && error.message === "Network Error";
			const unAuthorized = [401, 403].includes(
				error.response?.status ?? 0
			);

			if (noNetwork || unAuthorized) {
				if (unAuthorized) {
					navFunction?.(APP_ROUTES.AUTH.LOGOUT);
				}
			}
			return Promise.reject(error);
		}
	);

	return axiosInstance;
};

export const apiCall = async <T = unknown>(
	options: ApiCallOptions
): Promise<T> => {
	const {
		method = "get",
		endpoint,
		data,
		navFunction,
		params,
		headers,
	} = options;
	const axiosInstance = createAxiosInstance({
		navFunction,
		config: { baseURL: APP_CONFIG.SERVER_BASE_URL },
	});

	const isFormData = data instanceof FormData;
	const headersConfig = isFormData ? {} : headers;

	const response = await axiosInstance.request<T>({
		url: endpoint,
		method,
		data: data,
		params: params,
		headers: headersConfig,
	});

	return response.data;
};

export const handleApiError = (err: unknown): ApiErrorData => {
	const typedError = err as AxiosError;

	if (axios.isAxiosError(typedError)) {
		return {
			error: typedError.code ?? "AxiosError",
			message: typedError.message,
			path: typedError.request?.path ?? "",
			status: typedError.response?.status ?? 0,
			timestamp: new Date().toISOString(),
		};
	}

	return {
		error: "GeneralError",
		message: (err as Error).message,
		path: "",
		status: 0,
		timestamp: new Date().toISOString(),
	};
};
