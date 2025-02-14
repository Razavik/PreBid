import axiosInstance from './axios.config';
import { setJwtToken, removeJwtToken, getJwtToken, setRefreshToken, removeRefreshToken, getRefreshToken } from '@utils/jwt';
import { store } from "@store/store";
import { setAuth, setRole, clearAuth, setAuthLoading } from "@store/slices/authSlice";
import { setUserInfo, clearUserInfo } from "@store/slices/userSlice";
import { ApiUserResponse, Client } from 'types/user.types';

interface LoginData {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
    refresh_token: string;
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

const API_URL = import.meta.env.VITE_API_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

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
                if (response.data.refresh_token) {
                    setRefreshToken(response.data.refresh_token);
                }

                // Получаем данные пользователя
                const userInfo = await this.getUserInfo();

                if (userInfo) {
                    store.dispatch(setUserInfo(userInfo));
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
        }
        removeJwtToken();
        removeRefreshToken();
        store.dispatch(clearAuth());
        store.dispatch(clearUserInfo());
    },

    getToken() {
        return localStorage.getItem('token');
    },

    async checkAuth() {
        const token = getJwtToken();
        if (!token) {
            store.dispatch(setAuthLoading(false));
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
            }
            store.dispatch(setAuthLoading(false));
        } catch (error) {
            console.error('Ошибка при проверке авторизации:', error);
            this.logout();
            store.dispatch(setAuthLoading(false));
        }
    },

    async getUserInfo(): Promise<Client> {
        try {
            const response = await axiosInstance.get<ApiUserResponse>(`${API_URL}/user/information`);
            const userData: Client = {
                id: response.data.user.id,
                email: response.data.user.email,
                name_ru: response.data.client.name_ru,
                second_name_ru: response.data.client.second_name_ru,
                role: response.data.role
            };
            return userData;
        } catch (error: any) {
            console.error('Ошибка при получении данных пользователя:', error);
            throw error;
        }
    },

    async refreshToken(): Promise<string | null> {
        try {
            const refresh_token = getRefreshToken();
            if (!refresh_token) return null;

            const response = await axiosInstance.post(`${API_URL}/user/refresh-token`, {
                refresh_token,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            });

            if (response.data.access_token) {
                setJwtToken(response.data.access_token);
                if (response.data.refresh_token) {
                    setRefreshToken(response.data.refresh_token);
                }
                return response.data.access_token;
            }
            return null;
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            this.logout(); // Если обновление не удалось, выходим из системы
            return null;
        }
    }
};
