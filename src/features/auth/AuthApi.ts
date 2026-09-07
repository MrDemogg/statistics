import type { AuthResponse, LoginRequest, RegisterRequest } from "./AuthTypes";
import { securedApi } from "../../app/api/securedApi";
import { authExpire } from "./AuthSlice";

export const authApi = securedApi.injectEndpoints({
    endpoints: baseQuery => ({
        login: baseQuery.mutation<AuthResponse, LoginRequest>({ // авторизироваться по логину/паролю
            query: (body) => ({
                url: "/login",
                body,
                method: "POST",
            })
        }),
        getMe: baseQuery.query<AuthResponse, undefined>({ // авторизироваться по куки
            query: () => ({
                url: "/me",
                credentials: "include",
                method: "GET"
            })
        }),
        register: baseQuery.mutation<AuthResponse, RegisterRequest>({ // зарегистрироваться
            query: (body) => ({
                url: "/register",
                body,
                method: "POST"
            })
        }),
        logout: baseQuery.mutation({ // выйти
            query: () => ({
                url: "/logout",
                method: "POST",
                credentials: "include"
            }),
            onQueryStarted(_, api) { 
                api.dispatch(authExpire());
            }
        })
    }),
});

export const { useGetMeQuery, useLoginMutation, useRegisterMutation } = authApi;