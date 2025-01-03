import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const requireAuth = (callback: () => void) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        callback();
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    const handleRegisterClick = () => {
        setShowLoginModal(false);
        navigate('/register');
    };

    return {
        isAuthenticated,
        showLoginModal,
        requireAuth,
        handleCloseModal,
        handleRegisterClick
    };
};
