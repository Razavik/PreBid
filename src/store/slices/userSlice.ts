import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    info: any | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    info: null,
    isLoading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.info = action.payload;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.info = null;
        }
    }
});

export const { setUserInfo, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
