import { 
    createApi
} from "@reduxjs/toolkit/query/react"
import type { AuthResponse, LoginRequest, RegisterRequest } from "./AuthTypes";
import { createAppQuery } from "../../app/api";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: createAppQuery("/auth"), // todo: put api address
    endpoints: baseQuery => ({
        login: baseQuery.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: "/login",
                body,
                method: "POST",
            })
        }),
        getMe: baseQuery.query<AuthResponse, void>({
            query: () => ({
                url: "/me",
                credentials: "include",
                method: "GET"
            })
        }),
        register: baseQuery.mutation<AuthResponse, RegisterRequest>({
            query: (body) => ({
                url: "/register",
                body,
                method: "POST"
            })
        }),
        logout: baseQuery.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                credentials: "include"
            })
        })
    }),
});

export const { useGetMeQuery, useLoginMutation, useLogoutMutation, useRegisterMutation } = authApi;