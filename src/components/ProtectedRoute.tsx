import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { LoginForm } from "@components/LoginForm/LoginForm";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [showLogin, setShowLogin] = useState(!isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            setShowLogin(false);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <>
                <LoginForm
                    isOpen={showLogin}
                    onClose={() => {
                        setShowLogin(false);
                        navigate("/");
                    }}
                    onRegisterClick={() => navigate("/register")}
                />
            </>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
