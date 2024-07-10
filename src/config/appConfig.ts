if (!import.meta.env.VITE_API_BASE) {
	throw new Error("VITE_API_BASE is not defined");
}

export const BASE_API_ROUTE = import.meta.env.VITE_API_BASE;

export const APP_ROUTES = {
	ROOT: "/",
	AUTH: {
		ROOT: "/auth",
		LOGIN: "/auth/login",
		LOGOUT: "/auth/logout",
		REGISTER: "/auth/register",
	},
} as const;

export const API_ROUTES = {
	EXAMPLE: {
		GET: `${BASE_API_ROUTE}/example`,
	},
};

export const STORAGE_KEYS = {
	LOCAL_STORAGE: {
		USER_DETAILS: "userDetails",
	},
} as const;

export const APP_CONFIG = {
	SERVER_BASE_URL:
		import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:3000/api",
	CLOUDFLARE_SITEKEY: import.meta.env.VITE_CLOUDFLARE_SITEKEY,
} as const;
