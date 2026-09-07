import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { AuthState } from "./AuthTypes";

const initialState: AuthState = {
    logged: false
}

export const authSlice = createAppSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogged: (state, action: PayloadAction<boolean>) => { 
            state.logged = action.payload;
        }
    }
})

export const { setLogged } = authSlice.actions;

export default authSlice.reducer;