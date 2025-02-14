interface User {
    id: number;
    email: string;
}

interface Bid {
    max_price: string;
    price: string;
    user: User;
}

interface General {
    id: number;
    name: string;
    created_at: string;
    transportModel: {
        id: number;
        name: string;
        transport_brand: {
            id: number;
            name: string;
            code: string;
        };
    };
    docFee: {
        id: number;
        title: string;
        price: string;
    };
    year: number;
    photo: {
        id: number;
        img: string;
    };
    favourite: boolean;
    vin: string;
}

interface Characteristic {
    body_type: string;
    calculationSystem: {
        code: string;
    };
    volume: number;
    engine: string;
    fuel: {
        id: number;
        name: string;
    };
    drive: {
        id: number;
        name: string;
    };
    transmission: {
        id: number;
        name: string;
    };
    odometer: number;
    color: {
        id: number;
        name: string;
    };
    damage: Array<{
        id: number;
        name: string;
    }>;
    keys: string;
    damage_text: string;
    highlight: {
        id: number;
        name: string;
    };
}

export interface Delivery {
    date_delivery: string;
    port: {
        id: number;
        code: string;
        name: string;
    }
}

export interface BidHistoryItem {
    win: boolean;
    price: string;
    full_price: string;
    user_id: number;
    created_at: string;
}

export interface Transport {
    is_my: boolean;
    general: General;
    characteristic: Characteristic;
    bid: Bid;
    bidHistory: BidHistoryItem[];
    delivery: Delivery;
    image_key: string;
    images: Array<{
        id: number;
        img: string;
    }>;
    prebid_auction: {
        id: number;
        date_final: string;
        date_start: string;
        show_button_buy_now: boolean;
    };
}

export interface ApiResponse<T> {
    code: number;
    content: T[];
    pagination: {
        total_results: number;
        page: number;
        prev_page: number | null;
        next_page: number | null;
    };
}

export interface TransportFilters {
    code: number;
    content: {
        filters: {
            odometer: number[];
            year: number[];
            keys: Array<{
                id: number;
                value: string;
            }>;
            transportHighlight: Array<{
                id: number;
                name: string;
            }>;
            transportTransmission: Array<{
                id: number;
                name: string;
            }>;
            transportName: string[];
            transportDrive: Array<{
                id: number;
                name: string;
            }>;
            transportFuel: Array<{
                id: number;
                name: string;
            }>;
            transportBrand: Array<{
                id: number;
                name: string;
            }>;
            transportModel: Array<{
                id: number;
                name: string;
                transport_brand_id: number;
            }>;
            transportType: Array<{
                id: number;
                name: string;
            }>;
            transportColor: Array<{
                id: number;
                name: string;
            }>;
        };
        myFilter: any[];
    };
}
