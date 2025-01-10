import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { authService } from "@services/auth.service";
import { AppRoutes } from "./routes";
import "./App.css";

function App() {
    useEffect(() => {
        const initAuth = async () => {
            await authService.checkAuth();
        };
        initAuth();
    }, []);

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
