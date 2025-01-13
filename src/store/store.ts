import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import loadingReducer from "./slices/loadingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        loading: loadingReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
