import { Routes, Route } from "react-router-dom";
import Main from "@components/layouts/Main";
import Product from "@components/Main/Pages/Product/Product";
import Profile from "@components/Main/Pages/Profile/Profile";
import Catalog from "@components/Main/Pages/Catalog/Catalog";
import Auctions from "@components/Main/Pages/Auctions/Auctions";
import ProductProvider from "@context/ProductContext";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route index element={<Catalog />} />
                <Route
                    path="product/:lotNumber"
                    element={
                        <ProductProvider>
                            <Product />
                        </ProductProvider>
                    }
                />
                <Route path="profile" element={<Profile />} />
                <Route path="auctions" element={<Auctions />} />
            </Route>
        </Routes>
    );
};
