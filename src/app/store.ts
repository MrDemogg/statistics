import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authApi } from "../features/auth/AuthApi"
import authReducer from "../features/auth/AuthSlice"

const rootReducer = combineSlices({
	auth: authReducer,
	[authApi.reducerPath]: authApi.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
	const store = configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware => {
			return getDefaultMiddleware().concat(authApi.middleware)
		},
		preloadedState,
	})

	setupListeners(store.dispatch)
	return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>
