import {
    createApi,
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react"

export const serverUrl = "";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: serverUrl,
    credentials: "include"
});

export const securedQuery = (async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        api.dispatch(securedApi.util.resetApiState()); // похоже на циклический импорт, но так как baseQuery вызывается позже создания api - проблем в теории нет
    }

    return result;
}) satisfies BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>

export const securedApi = createApi({ // "защищенный" api для тех api файлов, чье состояние должно быть общим и зависеть от авторизированности пользователя.
    reducerPath: "secured",
    baseQuery: securedQuery,
    endpoints: () => ({})
})