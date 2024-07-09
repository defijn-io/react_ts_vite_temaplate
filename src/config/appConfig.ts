if (!import.meta.env.VITE_API_BASE) {
	throw new Error("VITE_API_BASE is not defined");
}

export const BASE_API_ROUTE = import.meta.env.VITE_API_BASE;

export const APP_ROUTES = {
	ROOT: "/",
} as const;

export const API_ROUTES = {
	EXAMPLE: {
		GET: `${BASE_API_ROUTE}/example`,
	},
};
