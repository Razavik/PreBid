import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "@components/layouts/Main";
import Product from "@components/Main/Pages/Product/Product";
import { Profile } from "@components/Main/Pages/Profile/Profile";
import ProductProvider from "@context/ProductContext";
import { authService } from "@services/auth.service";
import Catalog from "@components/Main/Pages/Catalog/Catalog";
import "./App.css";

function App() {
    useEffect(() => {
        const initApp = async () => {
            await authService.checkAuth();
        };
        initApp();
    }, []);

    return (
        <Router>
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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
