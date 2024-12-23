import axiosInstance from './axios.config';
import { setJwtToken, removeJwtToken, getJwtToken } from '@utils/jwt';
import { store } from '../store';
import { setAuthenticated } from "@store/slices/authSlice";
import { setUserInfo } from "@store/slices/userSlice";

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

            console.log('Отправляемые данные:', requestData);

            const response = await axiosInstance.post(`${API_URL}/user/login`, requestData);

            if (response.data.access_token) {
                setJwtToken(response.data.access_token);

                // Получаем данные пользователя
                const userInfo = await this.getUserInfo();
                if (userInfo) {
                    store.dispatch(setUserInfo(userInfo));
                    localStorage.setItem("user_info", JSON.stringify(userInfo));
                    // Устанавливаем isAuthenticated только после получения данных
                    store.dispatch(setAuthenticated(true));
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
                    // Устанавливаем isAuthenticated только после получения данных
                    store.dispatch(setAuthenticated(true));
                }
            }

            return response.data;
        } catch (error: any) {
            console.error('Ошибка при регистрации:', error.response?.data || error.message);
            throw error;
        }
    },

    async logout() {
        // Очищаем все локальные данные
        removeJwtToken();
        store.dispatch(setAuthenticated(false));
        store.dispatch(setUserInfo(null));
        localStorage.removeItem("user_info");
    },

    getToken() {
        return localStorage.getItem('token');
    },

    async checkAuth() {
        try {
            const token = getJwtToken();
            if (token) {
                setJwtToken(token);

                // Проверяем кэшированные данные
                const cachedUser = localStorage.getItem("user_info");
                if (cachedUser) {
                    store.dispatch(setUserInfo(JSON.parse(cachedUser)));
                    // Устанавливаем isAuthenticated только если есть кэшированные данные
                    store.dispatch(setAuthenticated(true));
                }

                // Обновляем данные с сервера
                const response = await this.getUserInfo();
                if (response) {
                    store.dispatch(setUserInfo(response));
                    localStorage.setItem("user_info", JSON.stringify(response));
                    store.dispatch(setAuthenticated(true));
                } else {
                    // Если не удалось получить данные с сервера
                    this.logout();
                }
            } else {
                // Если нет токена
                this.logout();
            }
        } catch (error) {
            console.error('Ошибка при проверке авторизации:', error);
            this.logout();
        }
    },

    async getUserInfo() {
        try {
            const response = await axiosInstance.get(`${API_URL}/user/information`);
            return response.data.client;
        } catch (error: any) {
            console.error('Ошибка при получении данных пользователя:', error);
            throw error;
        }
    }
};
