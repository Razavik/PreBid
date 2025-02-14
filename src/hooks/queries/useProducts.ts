import { useQuery } from "@tanstack/react-query";
import { catalogService } from "@services/catalog.service";
import { Transport, ApiResponse } from "types/catalog.types";

interface UseProductsParams {
    searchParams?: Record<string, any>;
    sortOrder?: string;
    sortDirection?: "asc" | "desc";
    isAuthenticated: boolean;
    category?: string;
}

export const useProducts = ({
    searchParams,
    sortOrder = "id",
    sortDirection = "asc",
    isAuthenticated,
    category,
}: UseProductsParams) => {
    return useQuery<ApiResponse<Transport>>({
        queryKey: ["products", searchParams, sortOrder, sortDirection, isAuthenticated, category],
        queryFn: async () => {
            if (searchParams && Object.keys(searchParams).length > 0) {
                return catalogService.searchTransports(
                    searchParams,
                    1,
                    10,
                    sortOrder,
                    sortDirection,
                    category
                );
            } else {
                return catalogService.getTransportsList(
                    category || (isAuthenticated ? undefined : "all"),
                    1,
                    10,
                    sortOrder,
                    sortDirection
                );
            }
        },
    });
};
