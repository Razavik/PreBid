import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "./components/Main/Pages/Catalog/Catalog";
import Main from "./components/layouts/Main";
import "./App.css";
import Product from "@components/Main/Pages/Product/Product";
import ProductProvider from "@context/ProductContext";
import { authService } from "./services/auth.service";

function App() {
    useEffect(() => {
        authService.checkAuth();
    }, []);

    return (
        <ProductProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />}>
                        <Route index element={<Catalog />} />
                        <Route
                            path="product/:lotNumber"
                            element={<Product />}
                        />
                    </Route>
                </Routes>
            </Router>
        </ProductProvider>
    );
}

export default App;
