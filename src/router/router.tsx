import { APP_ROUTES } from "@/config/appConfig";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

export const browserRouter = createBrowserRouter([
	{
		path: APP_ROUTES.ROOT,
		element: <HomePage />,
	},
]);
