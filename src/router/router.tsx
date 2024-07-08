import HomePage from "@/pages/HomePage";
import { createBrowserRouter } from "react-router-dom";

export const browserRouter = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
]);
