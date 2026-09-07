import type { AuthResponse, LoginRequest, RegisterRequest } from "./AuthTypes";
import { securedApi } from "../../app/api";
import { setLogged } from "./AuthSlice";

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
                api.dispatch(setLogged(false));
            }
        })
    }),
});

export const { useGetMeQuery, useLoginMutation, useRegisterMutation } = authApi;