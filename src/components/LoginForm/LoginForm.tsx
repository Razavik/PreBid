import { FC, useState } from "react";
import styles from "./LoginForm.module.css";
import Button, { ColorButton } from "@ui/Button/Button";
import closeIcon from "@assets/img/icons/closeButton.svg";
import { authService } from "@services/auth.service";
import Modal from "@ui/Modal/Modal";
import { Input } from "@ui/inputs/Input/Input";
import { PasswordInput } from "@ui/inputs/PasswordInput/PasswordInput";

interface LoginFormProps {
	isOpen: boolean;
	onClose: () => void;
	onRegisterClick: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ isOpen, onClose, onRegisterClick }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			await authService.login({
				username: email,
				password: password,
			});
			onClose();
		} catch (error) {
			setError("Неверный email или пароль");
		} finally {
			setIsLoading(false);
		}
	};

	const handleRegisterClick = () => {
		onClose();
		onRegisterClick();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={styles.container}>
				<button className={styles.closeButton} onClick={onClose}>
					<img src={closeIcon} alt="Закрыть" />
				</button>
				<div className={styles.header}>
					<h2>Вход в личный кабинет</h2>
				</div>
				<div className={styles.registerBlock}>
					<p className={styles.registerText}>Еще нет аккаунта?</p>
					<Button
						type="button"
						colorButton={ColorButton.GREEN}
						paddingStyle={{ topBottom: 2, leftRight: 16 }}
						onClick={handleRegisterClick}
					>
						Зарегистрироваться
					</Button>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					{error && <div className={styles.error}>{error}</div>}
					<Input
						type="text"
						id="email"
						name="email"
						label="Электронная почта"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<PasswordInput value={password} onChange={setPassword} required />
					<div className={styles.buttonSeparator}>
						<Button colorButton={ColorButton.BLUE} disabled={isLoading} type="submit">
							{isLoading ? "Вход..." : "Войти в аккаунт"}
						</Button>
						<a href="#" className={styles.forgotPassword}>
							Забыли пароль
						</a>
					</div>
				</form>
			</div>
		</Modal>
	);
};
