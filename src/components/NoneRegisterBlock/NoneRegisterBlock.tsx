import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './NoneRegisterBlock.module.css';

interface NoneRegisterBlockProps {
    onLoginClick: () => void;
}

export const NoneRegisterBlock: FC<NoneRegisterBlockProps> = ({ onLoginClick }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h2>Для доступа к функционалу необходимо авторизоваться</h2>
            <button onClick={onLoginClick} className={styles.loginButton}>
                Войти
            </button>
        </div>
    );
};
