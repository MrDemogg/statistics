import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./app/routes"
import { RouteIf } from "./common/components/RouteIf"
import { HomePage } from "./features/HomePage"
import { useGetMeQuery } from "./features/auth/AuthApi"
import { Navbar } from "./features/Navbar/Navbar";
import { Footer } from "./features/Footer";

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"

export const App = () => {
	const { data: userData, isLoading } = useGetMeQuery()

	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<HomePage />} />
				<Route
					element={
						<RouteIf
							when={userData != null}
							loading={isLoading}
							fallbackPath={ROUTES.HOME}
						/>
					}
				>
					<Route path={ROUTES.DASHBOARD} />
					<Route path={ROUTES.PROJECT(":id")} />
				</Route>
				<Route
					element={
						<RouteIf
							when={userData == null}
							fallbackPath={ROUTES.HOME}
						/>
					}
				>
					<Route path={ROUTES.AUTH.LOGIN} />
					<Route path={ROUTES.AUTH.REGISTER} />
				</Route>
			</Routes>
			<Footer />
		</>
	)
}
