import axios from "axios";

interface Country {
    id: number;
    short_name_en: string | null;
    name_en: string | null;
    short_name_ru: string;
    name_ru: string;
}

interface CountriesResponse {
    countries: Country[];
    pagination: {
        total_results: number;
        page: number;
        prev_page: number | null;
        next_page: number | null;
    };
}

class CountriesService {
    private readonly API_URL = import.meta.env.VITE_API_URL;

    async getCountries(): Promise<Country[]> {
        try {
            const response = await axios.get<CountriesResponse>(`${this.API_URL}/countries`);
            return response.data.countries;
        } catch (error) {
            console.error("Ошибка получения стран:", error);
            return [];
        }
    }
}

export const countriesService = new CountriesService();
