import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
    isLoading: boolean;
    requestCount: number;
}

const initialState: LoadingState = {
    isLoading: false,
    requestCount: 0
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.requestCount++;
            state.isLoading = true;
        },
        stopLoading: (state) => {
            state.requestCount--;
            state.isLoading = state.requestCount > 0;
        }
    }
});

export const { startLoading, stopLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
