import { useEffect, FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authService } from "@services/auth.service";
import { AppRoutes } from "./routes";
import { RootState } from "@store/store";
import { Loader } from "@ui/Loader/Loader";
import { LogoutModal } from "@ui/LogoutModal/LogoutModal";
import { setShowLogoutModal } from "@store/slices/authSlice";
import "./App.css";

const App: FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    const showLogoutModal = useSelector((state: RootState) => state.auth.showLogoutModal);

    useEffect(() => {
        const initAuth = async () => {
            await authService.checkAuth();
        };
        initAuth();
    }, []);

    const handleCloseLogoutModal = () => {
        dispatch(setShowLogoutModal(false));
    };

    return (
        <BrowserRouter>
            <Loader isLoading={isLoading} />
            <LogoutModal 
                isOpen={showLogoutModal} 
                onClose={handleCloseLogoutModal} 
            />
            <AppRoutes />
        </BrowserRouter>
    );
};

export default App;
