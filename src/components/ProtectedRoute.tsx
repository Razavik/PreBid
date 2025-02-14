import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { useLocation } from "react-router-dom";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const onLoginRequired = () => {
	const mainComponent = document.querySelector("main");
	if (mainComponent) {
		const event = new CustomEvent("openLoginModal");
		mainComponent.dispatchEvent(event);
	}
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const location = useLocation();

	useEffect(() => {
		if (!isAuthenticated) {
			onLoginRequired();
		}
	}, [isAuthenticated, location.pathname]);

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
