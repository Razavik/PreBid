import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthenticated: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        }
    },
});

export const { setAuthenticated, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
