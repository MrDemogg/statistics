import type { AuthResponse, LoginRequest, RegisterRequest } from "./AuthTypes";
import { securedApi } from "../../app/securedApi.ts";
import type { BaseQueryFn, TypedMutationOnQueryStarted } from "@reduxjs/toolkit/query";

const refetchMeAfterAuth: TypedMutationOnQueryStarted<unknown, unknown, BaseQueryFn> =
    async (_, { dispatch, queryFulfilled }) => { 
        try {
            await queryFulfilled;
            void dispatch(authApi.endpoints.getMe.initiate())
        }
        catch (e) { 
            console.log(e)
        }
    }

export const authApi = securedApi.injectEndpoints({
    endpoints: baseQuery => ({
        login: baseQuery.mutation<AuthResponse, LoginRequest>({ // авторизироваться по логину/паролю
            query: (body) => ({
                url: "/login",
                body,
                method: "POST",
            }),
            onQueryStarted: refetchMeAfterAuth
        }),
        getMe: baseQuery.query<AuthResponse, void>({ // авторизироваться по куки
            query: () => ({
                url: "/me",
                method: "GET"
            })
        }),
        register: baseQuery.mutation<AuthResponse, RegisterRequest>({ // зарегистрироваться
            query: (body) => ({
                url: "/register",
                body,
                method: "POST"
            }),
            onQueryStarted: refetchMeAfterAuth
        }),
        logout: baseQuery.mutation({ // выйти
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } finally {
                    dispatch(securedApi.util.resetApiState());
                }
            }
        })
    }),
});

export const { useGetMeQuery, useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;