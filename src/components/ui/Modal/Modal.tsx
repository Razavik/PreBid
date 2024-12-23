import { FC, ReactNode } from "react";
import styles from "./modal.module.css";
import classNames from "classnames";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className={classNames(styles.overlay, { [styles.overlayVisible]: isOpen })}
            onClick={handleOverlayClick}
        >
            <div className={classNames(styles.modal, { [styles.modalVisible]: isOpen })}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
