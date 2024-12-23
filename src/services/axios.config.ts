import axios from 'axios';
import { getJwtToken } from '@utils/jwt';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// Добавляем токен к каждому запросу
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getJwtToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Отправляем запрос:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data
        });
        return config;
    },
    (error) => {
        console.error('Ошибка при отправке запроса:', error);
        return Promise.reject(error);
    }
);

// Обрабатываем ошибки ответа
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Получен ответ:', {
            status: response.status,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('Ошибка ответа:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
