import axiosInstance from './axios.config';
import { setJwtToken, removeJwtToken } from '@utils/jwt';
import { store } from '../store';
import { setAuthenticated } from '../store/authSlice';

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
                store.dispatch(setAuthenticated(true));
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
                store.dispatch(setAuthenticated(true));
            }

            return response.data;
        } catch (error: any) {
            console.error('Ошибка при регистрации:', error.response?.data || error.message);
            throw error;
        }
    },

    logout() {
        removeJwtToken();
        store.dispatch(setAuthenticated(false));
    },

    getToken() {
        return localStorage.getItem('token');
    },

    checkAuth() {
        const token = this.getToken();
        store.dispatch(setAuthenticated(!!token));
        return !!token;
    }
};
