import axiosInstance from './axios.config';
import { format } from 'date-fns';

export interface ApiResponse<T> {
    status: string;
    code: number;
    content: T;
}

export interface Auction {
    id: number;
    name: string;
    is_closed: number;
    bid_time: number;
    countries: Array<{
        id: number;
        name_ru: string;
        short_name_ru: string;
        name_en: string | null;
        short_name_en: string | null;
    }>;
    created_at: string;
    date_final: string | null;
    date_start: string;
    status: {
        id: number;
        name: string;
        code: string;
        created_at: string;
    };
    transports: any[];
    transports_count: number;
    updated_at: string;
}

export interface AuctionListItem {
    id: number;
    date: string;
    contents: Array<Auction>;
}

export interface AuctionsResponse {
    status: string;
    code: number;
    content: Array<AuctionListItem>;
    pagination: {
        total_results: number;
        page: number;
        prev_page: number | null;
        next_page: number | null;
    };
}

export interface CreateAuctionData {
    name: string;
    countries: number[];
    date_start: string;
    bid_time?: number;
    date_final?: string | null;
    is_closed: number;
}

export interface SearchParams {
    country_id: number | null;
    date_start_select: string | null;
    date_final_select: string | null;
}

class AuctionsService {
    private readonly API_URL = "https://autoru.neonface.by/api/v2";

    async getAuctions(
        page: number = 1,
        limit: number = 10,
        searchParams?: Partial<SearchParams>
    ): Promise<{
        auctions: Auction[];
        pagination: {
            total_results: number;
            page: number;
            prev_page: number | null;
            next_page: number | null;
        };
    }> {
        try {
            const search: SearchParams = {
                country_id: searchParams?.country_id || null,
                date_start_select: searchParams?.date_start_select || null,
                date_final_select: searchParams?.date_final_select || null,
            };

            const response = await axiosInstance.post<AuctionsResponse>(
                `${this.API_URL}/auctions/search`,
                {
                    page,
                    limit,
                    search
                }
            );

            // Преобразуем структуру ответа в нужный формат
            const auctions = response.data.content.reduce((acc: Auction[], item: AuctionListItem) => {
                return [...acc, ...item.contents];
            }, []);

            return {
                auctions,
                pagination: response.data.pagination
            };
        } catch (error) {
            console.error("Error fetching auctions:", error);
            return {
                auctions: [],
                pagination: {
                    total_results: 0,
                    page: 1,
                    prev_page: null,
                    next_page: null
                }
            };
        }
    }

    async createAuction(data: CreateAuctionData): Promise<Auction | null> {
        try {
            const response = await axiosInstance.post<ApiResponse<Auction>>(
                `${this.API_URL}/auctions`,
                data
            );
            return response.data.content;
        } catch (error) {
            console.error("Error creating auction:", error);
            return null;
        }
    }
}

export const auctionsService = new AuctionsService();
