import axios from 'axios';
import { authService } from './auth.service';
import { store } from '@store/store';
import { setShowLogoutModal } from '@store/slices/authSlice';
import { startLoading, stopLoading } from '@store/slices/loadingSlice';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Добавляем токен к каждому запросу
axiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(startLoading());
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        store.dispatch(stopLoading());
        return Promise.reject(error);
    }
);

// Обработка ответов
axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(stopLoading());
        return response;
    },
    async (error) => {
        store.dispatch(stopLoading());

        // Если получаем 401 и это не запрос на обновление токена
        if (
            error.response?.status === 401 &&
            !error.config.url.includes('/user/refresh')
        ) {
            try {
                // Пробуем обновить токен
                const newToken = await authService.refreshToken();

                if (newToken) {
                    // Повторяем исходный запрос с новым токеном
                    error.config.headers['Authorization'] = `Bearer ${newToken}`;
                    return axiosInstance(error.config);
                }
            } catch (refreshError) {
                console.error('Ошибка при обновлении токена:', refreshError);
            }

            // Если не удалось обновить токен, выходим из системы
            store.dispatch(setShowLogoutModal(true));
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;