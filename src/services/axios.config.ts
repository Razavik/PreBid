import axios from 'axios';
import { authService } from './auth.service';
import { store } from '@store/store';
import { clearAuth, setShowLogoutModal } from '@store/slices/authSlice';
import { clearUserInfo } from '@store/slices/userSlice';
import { startLoading, stopLoading } from '@store/slices/loadingSlice';

const axiosInstance = axios.create({
    baseURL: 'https://autoru.neonface.by/api/v2',
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

// Обрабатываем ответы и ошибки
axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(stopLoading());
        return response;
    },
    async (error) => {
        store.dispatch(stopLoading());
        const originalRequest = error.config;

        // Если ошибка 401 (Unauthorized) и это не повторный запрос
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Пробуем обновить токен
                const newToken = await authService.refreshToken();
                
                if (newToken) {
                    // Если получили новый токен, повторяем исходный запрос
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } else {
                    // Если не удалось обновить токен, выходим из системы
                    store.dispatch(setShowLogoutModal(true));
                    store.dispatch(clearAuth());
                    store.dispatch(clearUserInfo());
                    localStorage.removeItem('token');
                    localStorage.removeItem('user_info');
                }
            } catch (refreshError) {
                // В случае ошибки обновления токена, выходим из системы
                store.dispatch(setShowLogoutModal(true));
                store.dispatch(clearAuth());
                store.dispatch(clearUserInfo());
                localStorage.removeItem('token');
                localStorage.removeItem('user_info');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;