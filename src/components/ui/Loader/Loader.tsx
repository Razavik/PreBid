import { FC } from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
    isLoading: boolean;
}

export const Loader: FC<LoaderProps> = ({ isLoading }) => {
    if (!isLoading) return null;
    
    return (
        <div className={styles.overlay}>
            <div className={styles.spinner}></div>
        </div>
    );
};
