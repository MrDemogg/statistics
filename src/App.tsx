import { Route, Routes } from "react-router-dom"
import { ROUTES } from "./app/routes"
import { RouteIf } from "./common/components/RouteIf"
import { HomePage } from "./features/HomePage"
import { useGetMeQuery } from "./features/auth/AuthApi"

export const App = () => {
	const { data: userData, isLoading } = useGetMeQuery();
	
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route
				element={
					<RouteIf
						when={userData !== null}
						loading={isLoading}
						fallbackPath={ROUTES.AUTH.REGISTER}
					/>
				}
			>
				<Route path={ROUTES.DASHBOARD} />
				<Route path={ROUTES.PROJECT(":id")} />
			</Route>
		</Routes>
	)
}
