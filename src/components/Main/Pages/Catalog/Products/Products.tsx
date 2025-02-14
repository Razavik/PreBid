import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import CardView from "./CardView/CardView";
import TabularView from "./TabularView/TabularView";
import style from "./products.module.css";
import { useProducts } from "@hooks/queries/useProducts";
import notFoundCard from "@assets/img/not-found-card.png";

interface Props {
    setCountProducts: (count: number) => void;
    currentView: "tabular" | "card";
    searchParams?: Record<string, any>;
    category?: string;
    onBid: (currentPrice: number, auctionId: number, transportId: number) => void;
}

const Products: React.FC<Props> = ({
    setCountProducts,
    currentView,
    searchParams,
    category,
    onBid,
}) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [sortOrder, setSortOrder] = useState<string>("id");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const { data, error } = useProducts({
        searchParams,
        sortOrder,
        sortDirection,
        isAuthenticated,
        category,
    });

    const handleSort = (order: string, direction: "asc" | "desc") => {
        setSortOrder(order);
        setSortDirection(direction);
    };

    if (error) {
        return (
            <div className={style.error}>
                <img src={notFoundCard} alt="not-found" />
                <p>Лотов не было найдено</p>
            </div>
        );
    }

    if (data) {
        setCountProducts(data.pagination.total_results);
    }

    return (
        <>
            <div className={style.desktop}>
                {currentView === "card" ? (
                    <CardView
                        products={data?.content || []}
                        isAuthenticated={isAuthenticated}
                        onBid={onBid}
                    />
                ) : (
                    <TabularView
                        products={data?.content || []}
                        isAuthenticated={isAuthenticated}
                        onSort={handleSort}
                        onBid={onBid}
                    />
                )}
            </div>
            <div className={style.mobile}>
                <CardView
                    products={data?.content || []}
                    isAuthenticated={isAuthenticated}
                    onBid={onBid}
                />
            </div>
        </>
    );
};

export default Products;
