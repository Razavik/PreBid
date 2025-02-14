import axios from 'axios';
import axiosInstance from './axios.config';
import type { Transport, ApiResponse, TransportFilters } from 'types/catalog.types';
import { authService } from './auth.service';

// Создаем отдельный экземпляр axios для запросов букмарка
const bookmarkAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Добавляем только обработку токена, без глобального лоадера
bookmarkAxios.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

class CatalogService {
    private static instance: CatalogService;
    private API_URL = import.meta.env.VITE_API_URL;

    private constructor() { }

    public static getInstance(): CatalogService {
        if (!CatalogService.instance) {
            CatalogService.instance = new CatalogService();
        }
        return CatalogService.instance;
    }

    public async getFilters(): Promise<TransportFilters> {
        try {
            const { data } = await axiosInstance.get<TransportFilters>(`${this.API_URL}/transport/filters`);
            return data;
        } catch (error) {
            console.error('Ошибка получения фильтров:', error);
            throw error;
        }
    }

    public async getTransportsList(
        category: string | undefined,
        page: number = 1,
        limit: number = 10,
        order: string = 'id',
        by: 'asc' | 'desc' = 'asc',
    ): Promise<ApiResponse<Transport>> {
        try {
            const { data } = await axiosInstance.get<ApiResponse<Transport>>(
                `${this.API_URL}/transport${category ? `/${category}` : ''}`,
                {
                    params: {
                        page,
                        limit,
                        order,
                        by
                    }
                }
            );
            return data;
        } catch (error) {
            console.error('Ошибка получения списка транспортов:', error);
            throw error;
        }
    }

    public async searchTransports(
        search: Record<string, any>,
        page: number = 1,
        limit: number = 10,
        order: string = 'id',
        by: 'asc' | 'desc' = 'asc',
        category?: string,
    ): Promise<ApiResponse<Transport>> {
        try {
            const { data } = await axiosInstance.post<ApiResponse<Transport>>(
                `${this.API_URL}/transport/search${category ? "-" + category : ""}`,
                {
                    search,
                    page,
                    limit,
                    order,
                    by
                }
            );
            return data;
        } catch (error) {
            console.error('Ошибка поиска транспорта:', error);
            throw error;
        }
    }

    public async toggleFavorite(shouldAdd: boolean, transportId: number): Promise<void> {
        try {
            await bookmarkAxios.post(`${this.API_URL}/transport/favourite`, {
                add: shouldAdd,
                prebid_transport_id: transportId,
            });
        } catch (error) {
            console.error('Ошибка при изменении избранного:', error);
            throw error;
        }
    }

    public async addToFavorites(shouldAdd: boolean, transportId: number): Promise<void> {
        try {
            await axiosInstance.post(`${this.API_URL}/transport/favourite`, {
                add: shouldAdd,
                prebid_transport_id: transportId,
            });
        } catch (error) {
            console.error('Ошибка при изменении избранного:', error);
            throw error;
        }
    }

    public async getTransportById(id: string, isAuthenticated: boolean): Promise<{ content: Transport }> {
        try {
            const response = await axiosInstance.get<{ content: Transport }>(`${this.API_URL}/transport${isAuthenticated ? '/with-user' : ''}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Ошибка получения данных о транспорте:', error);
            throw error;
        }
    }
}

export const catalogService = CatalogService.getInstance();