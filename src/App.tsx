import { FC, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Loader } from "@ui/Loader/Loader";
import { LogoutModal } from "@ui/LogoutModal/LogoutModal";
import { LoadingOverlay } from "@ui/LoadingOverlay/LoadingOverlay";
import { setShowLogoutModal, setAuthLoading } from "@store/slices/authSlice";
import { ToastContainer } from "@components/ui/ToastContainer/ToastContainer";
import { authService } from "@services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import "./App.css";
import QueryProvider from "./providers/QueryProvider";

const App: FC = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state: RootState) => state.loading.isLoading);
	const isAuthLoading = useSelector((state: RootState) => state.auth.isLoading);
	const showLogoutModal = useSelector((state: RootState) => state.auth.showLogoutModal);

	useEffect(() => {
		const initAuth = async () => {
			const token = authService.getToken();
			if (token) {
				await authService.checkAuth();
			}
			dispatch(setAuthLoading(false));
		};
		initAuth();
	}, [dispatch]);

	const handleCloseLogoutModal = () => {
		dispatch(setShowLogoutModal(false));
	};

	return (
		<QueryProvider>
			<BrowserRouter>
				{authService.getToken() && isAuthLoading && <LoadingOverlay />}
				{!isAuthLoading && <Loader isLoading={isLoading} />}
				<LogoutModal isOpen={showLogoutModal} onClose={handleCloseLogoutModal} />
				<AppRoutes />
				<ToastContainer />
			</BrowserRouter>
		</QueryProvider>
	);
};

export default App;
