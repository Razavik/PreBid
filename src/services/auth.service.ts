import axiosInstance from './axios.config';
import { setJwtToken, removeJwtToken, getJwtToken } from '@utils/jwt';
import { store } from '../store/store';
import { setAuth, setRole, clearAuth } from "@store/slices/authSlice";
import { setUserInfo, clearUserInfo } from "@store/slices/userSlice";

interface LoginData {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface RegisterData {
    second_name_ru: string;
    name_ru: string;
    phone: string;
    email: string;
    password: string;
}

const API_URL = 'https://autoru.neonface.by/api/v2';
const CLIENT_ID = 6;
const CLIENT_SECRET = "XsCXIvC6CF6tGLSqWN7e7juDAe0DNeJBQ54JbH07";

export const authService = {
    async login(data: LoginData): Promise<LoginResponse> {
        try {
            const requestData = {
                username: data.username,
                password: data.password,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            };

            const response = await axiosInstance.post(`${API_URL}/user/login`, requestData);

            if (response.data.access_token) {
                setJwtToken(response.data.access_token);

                // Получаем данные пользователя
                const userInfo = await this.getUserInfo();

                if (userInfo) {
                    store.dispatch(setUserInfo(userInfo.client));
                    if (userInfo.role) {
                        store.dispatch(setRole(userInfo.role));
                    }
                    store.dispatch(setAuth(true));
                }
            }

            return response.data;
        } catch (error: any) {
            console.error('Ошибка при авторизации:', error.response?.data || error.message);
            throw error;
        }
    },

    async register(data: RegisterData) {
        try {
            const response = await axiosInstance.post(`${API_URL}/lead_generation`, data);

            if (response.data.access_token) {
                setJwtToken(response.data.access_token);

                // Получаем данные пользователя
                const userInfo = await this.getUserInfo();
                if (userInfo) {
                    store.dispatch(setUserInfo(userInfo));
                    localStorage.setItem("user_info", JSON.stringify(userInfo));
                    store.dispatch(setAuth(true));
                }
            }

            return response.data;
        } catch (error: any) {
            console.error('Ошибка при регистрации:', error.response?.data || error.message);
            throw error;
        }
    },

    async logout() {
        try {
            await axiosInstance.post(`${API_URL}/user/logout`);
        } catch (error: any) {
            console.error('Ошибка при выходе из системы:', error.response?.data || error.message);
        } finally {
            removeJwtToken();
            store.dispatch(clearAuth());
            store.dispatch(clearUserInfo());
            localStorage.removeItem("user_info");
        }
    },

    getToken() {
        return localStorage.getItem('token');
    },

    async checkAuth() {
        const token = getJwtToken();
        if (!token) {
            this.logout();
            return;
        }

        try {
            const userInfo = await this.getUserInfo();
            if (userInfo) {
                store.dispatch(setUserInfo(userInfo));
                if (userInfo.role) {
                    store.dispatch(setRole(userInfo.role));
                }
                store.dispatch(setAuth(true));
                localStorage.setItem("user_info", JSON.stringify(userInfo));
            }
        } catch (error) {
            console.error('Ошибка при проверке авторизации:', error);
            this.logout();
        }
    },

    async getUserInfo() {
        try {
            const response = await axiosInstance.get(`${API_URL}/user/information`);
            const userData = {
                ...response.data,
                role: response.data.role || null
            };
            return userData;
        } catch (error: any) {
            console.error('Ошибка при получении данных пользователя:', error);
            throw error;
        }
    }
};
