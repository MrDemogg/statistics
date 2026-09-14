export type AuthResponse = {
	userId: number | null
}

export type LoginRequest = {
    username: string,
    password: string
}

export type RegisterRequest = LoginRequest & {
    email: string
}