import React from 'react';
import { Toast } from '../Toast/Toast';
import { useToastStore } from '@store/toastStore';

export const ToastContainer: React.FC = () => {
    const { message, type, isVisible, hideToast } = useToastStore();

    if (!isVisible) return null;

    return (
        <Toast
            message={message}
            type={type}
            onClose={hideToast}
        />
    );
};
