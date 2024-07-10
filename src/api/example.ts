import { API_ROUTES } from "@/config/appConfig";
import { apiCall } from "@/config/axiosConfig";
import { useQuery } from "@tanstack/react-query";

type ResponseData = {
	message: string;
};

async function example(): Promise<ResponseData> {
	return apiCall({
		method: "get",
		endpoint: API_ROUTES.EXAMPLE.GET,
	});
}

export const useExample = () => {
	return useQuery({
		queryKey: ["example"],
		queryFn: example,
	});
};
