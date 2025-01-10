import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Client {
    name_ru: string;
    second_name_ru: string | null;
    code: number;
}

interface UserState {
    info: Client | null;
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
        setUserInfo: (state, action: PayloadAction<Client>) => {
            state.info = action.payload;
            state.error = null;
        },
        clearUserInfo: (state) => {
            state.info = null;
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

export const { setUserInfo, clearUserInfo, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
