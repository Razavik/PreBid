import { create } from 'zustand';

interface ToastState {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
    showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
    hideToast: () => void;
}

type ToastStore = ToastState;

export const useToastStore = create<ToastStore>((set) => ({
    message: '',
    type: 'success',
    isVisible: false,
    showToast: (message: string, type: 'success' | 'error' | 'info' = 'success') =>
        set({ message, type, isVisible: true }),
    hideToast: () => set({ isVisible: false }),
}));
