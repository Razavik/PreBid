import axios from 'axios';
import { store } from '@store/store';
import { clearAuth, setShowLogoutModal } from '@store/slices/authSlice';
import { clearUserInfo } from '@store/slices/userSlice';
import { startLoading, stopLoading } from '@store/slices/loadingSlice';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(startLoading());
        const token = localStorage.getItem('token');
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

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(stopLoading());
        return response;
    },
    async (error) => {
        store.dispatch(stopLoading());

        if (error.response?.status === 401 && !error.config._retry) {
            if (isRefreshing) {
                try {
                    await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    return axiosInstance(error.config);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            isRefreshing = true;
            error.config._retry = true;

            try {
                // Здесь можно добавить логику обновления токена, если она будет
                processQueue();
                return axiosInstance(error.config);
            } catch (refreshError) {
                processQueue(refreshError);
                // Показываем модальное окно о разлогине
                store.dispatch(setShowLogoutModal(true));
                // Очищаем данные
                store.dispatch(clearAuth());
                store.dispatch(clearUserInfo());
                localStorage.removeItem('token');
                localStorage.removeItem('user_info');
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;