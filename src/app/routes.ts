export const ROUTES = {
    HOME: "/",
    AUTH: {
        LOGIN: "/login",
        REGISTER: "/register"
    },
    DASHBOARD: "/dashboard",
    PROJECT: (id: string) => `/project/${id}`
} as const