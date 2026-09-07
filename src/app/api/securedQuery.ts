import { fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { authExpire } from "../../features/auth/AuthSlice";

export const serverUrl = "";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: serverUrl 
});

export const securedQuery = (async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        api.dispatch(authExpire());
    }

    return result;
}) satisfies BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>