import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Role {
    code: string;
    title: string;
}

interface AuthState {
    isAuthenticated: boolean;
    role: Role | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    role: null,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        setRole: (state, action: PayloadAction<Role>) => {
            state.role = action.payload;
        },
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.role = null;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { setAuth, setRole, clearAuth, setError } = authSlice.actions;
export default authSlice.reducer;
