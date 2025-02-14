import axiosInstance from './axios.config';

class BidService {
    private static instance: BidService;
    private API_URL = import.meta.env.VITE_API_URL;

    private constructor() { }

    public static getInstance(): BidService {
        if (!BidService.instance) {
            BidService.instance = new BidService();
        }
        return BidService.instance;
    }

    public async bid(auctionId: number, transportId: number, price: number): Promise<void> {
        try {
            await axiosInstance.post(`${this.API_URL}/transport/bid/bid`, {
                prebid_auction_id: auctionId,
                prebid_transport_id: transportId,
                price: price,
                step: 5,
                step_current_price: 5,
                step_max_price: 5
            });
        } catch (error) {
            console.error('Ошибка при изменении избранного:', error);
            throw error;
        }
    }
}

export const bidService = BidService.getInstance();