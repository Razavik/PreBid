import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LogoutModal.module.css";
import Button, { ColorButton } from "../Button/Button";

interface LogoutModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const LogoutModal: FC<LogoutModalProps> = ({ isOpen, onClose }) => {
	const navigate = useNavigate();

	if (!isOpen) return null;

	const handleClick = () => {
		onClose();
		navigate("/");
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h2 className={styles.title}>Сессия завершена</h2>
				<p className={styles.message}>
					Ваша сессия была завершена из-за длительного отсутствия активности. Пожалуйста,
					войдите снова для продолжения работы.
				</p>
				<Button onClick={handleClick} colorButton={ColorButton.BLUE}>
					Закрыть
				</Button>
			</div>
		</div>
	);
};
