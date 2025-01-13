import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Role {
    code: string;
    title: string;
}

interface AuthState {
    isAuthenticated: boolean;
    role: Role | null;
    error: string | null;
    showLogoutModal: boolean;
}

const initialState: AuthState = {
    isAuthenticated: false,
    role: null,
    error: null,
    showLogoutModal: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
            if (!action.payload) {
                state.role = null;
            }
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
        },
        setShowLogoutModal: (state, action: PayloadAction<boolean>) => {
            state.showLogoutModal = action.payload;
        }
    }
});

export const { setAuth, setRole, clearAuth, setError, setShowLogoutModal } = authSlice.actions;
export default authSlice.reducer;
