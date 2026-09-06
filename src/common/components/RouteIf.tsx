import { Navigate, Outlet } from "react-router-dom"

type RouteIfProps = {
	when: boolean
	loading?: boolean
	fallbackPath: string
}

export const RouteIf = ({
	when,
	loading = false,
	fallbackPath,
}: RouteIfProps) => {
	if (loading) {
		return <div>loading</div>
	}

	return when ? <Outlet /> : <Navigate to={fallbackPath} replace />
}
