import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { LoginForm } from "@components/LoginForm/LoginForm";
import { Loader } from "@ui/Loader/Loader";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const [showLogin, setShowLogin] = useState(!isAuthenticated);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isAuthenticated && location.pathname !== "/") {
			navigate("/");
		}
		setIsLoading(false);
	}, [isAuthenticated, location.pathname, navigate]);

	useEffect(() => {
		if (isAuthenticated) {
			setShowLogin(false);
		}
	}, [isAuthenticated]);

	if (isLoading) {
		return <Loader isLoading={true} />;
	}

	if (!isAuthenticated) {
		return (
			<LoginForm
				isOpen={showLogin}
				onClose={() => {
					setShowLogin(false);
					navigate("/");
				}}
				onRegisterClick={() => navigate("/register")}
			/>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
