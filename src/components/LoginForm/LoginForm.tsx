import { FC, useState, FormEvent } from "react";
import styles from "./LoginForm.module.css";
import Button, { ColorButton } from "@ui/Button/Button";
import eyeOpen from "@assets/img/icons/eye-open.svg";
import eyeClosed from "@assets/img/icons/eye-closed.svg";
import closeIcon from "@assets/img/icons/closeButton.svg";
import { authService } from "@services/auth.service";
import Modal from "@ui/Modal/Modal";

interface LoginFormProps {
	isOpen: boolean;
	onClose: () => void;
	onRegisterClick: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ isOpen, onClose, onRegisterClick }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			await authService.login({
				username: email,
				password: password,
			});
			onClose();
		} catch (err) {
			setError("Неверный логин или пароль");
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
					<div className={styles.inputGroup}>
						<label>Электронная почта</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label>Пароль</label>
						<div className={styles.passwordInput}>
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<button
								type="button"
								className={styles.togglePassword}
								onClick={() => setShowPassword(!showPassword)}
							>
								<img
									src={showPassword ? eyeOpen : eyeClosed}
									alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
								/>
							</button>
						</div>
					</div>
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
