import {
    createApi,
} from "@reduxjs/toolkit/query/react"
import { securedQuery } from "./securedQuery";

export const securedApi = createApi({ // "защищенный" api для тех api файлов, чье состояние должно быть общим и зависеть от авторизированности пользователя.
    reducerPath: "secured",
    baseQuery: securedQuery,
    endpoints: () => ({})
})