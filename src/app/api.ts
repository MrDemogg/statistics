import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react"


export const createAppQuery = (baseUrl: string) => {

    const rawBaseQuery = fetchBaseQuery({
        baseUrl
    });

    return (async (args, api, extraOptions) => {
        const result = await rawBaseQuery(args, api, extraOptions);

        if (result.error?.status === 401) {
            api.dispatch(api.);
        }

        return result;
    }) satisfies BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>
}
