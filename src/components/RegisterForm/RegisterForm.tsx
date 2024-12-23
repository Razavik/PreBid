import { FC, useState, FormEvent } from "react";
import styles from "./RegisterForm.module.css";
import Button, { ColorButton } from "@ui/Button/Button";
import eyeOpen from "@assets/img/icons/eye-open.svg";
import eyeClosed from "@assets/img/icons/eye-closed.svg";
import closeIcon from "@assets/img/icons/closeButton.svg";
import Modal from "@ui/Modal/Modal";
import { authService } from "@services/auth.service";

interface RegisterFormProps {
	isOpen: boolean;
	onClose: () => void;
	onLoginClick: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ isOpen, onClose, onLoginClick }) => {
	const [formData, setFormData] = useState({
		second_name_ru: "",
		name_ru: "",
		phone: "+375",
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			// Добавляем значения по умолчанию к отправляемым данным
			const dataToSend = {
				...formData,
			};

			await authService.register(dataToSend);
			onClose();
		} catch (err: any) {
			if (err.response?.data?.message) {
				setError(err.response.data.message);
			} else if (err.response?.data?.errors) {
				const errors = err.response.data.errors;
				const firstError = Object.values(errors)[0];
				setError(Array.isArray(firstError) ? firstError[0] : firstError);
			} else {
				setError("Произошла ошибка при регистрации");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleLoginClick = () => {
		onClose();
		onLoginClick();
	};

	const formatPhoneNumber = (value: string) => {
		// Убираем все нецифровые символы
		const numbers = value.replace(/[^\d]/g, "");

		// Если номер пустой, возвращаем базовый префикс
		if (numbers.length <= 3) return "+375";

		// Получаем код оператора (следующие 2 цифры после 375)
		const operatorCode = numbers.slice(3, 5);

		// Получаем оставшиеся цифры
		const restNumbers = numbers.slice(5);

		// Форматируем номер
		return `+375(${operatorCode})${restNumbers}`;
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;

		// Если пользователь пытается удалить +375, не даем ему это сделать
		if (!value.startsWith("+375")) {
			value = "+375" + value.replace(/^\+375/g, "");
		}

		// Форматируем номер
		const formattedNumber = formatPhoneNumber(value);

		// Ограничиваем длину номера (включая +375, скобки и 7 цифр)
		if (formattedNumber.length <= 17) {
			setFormData((prev) => ({
				...prev,
				phone: formattedNumber,
			}));
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={styles.container}>
				<button className={styles.closeButton} onClick={onClose}>
					<img src={closeIcon} alt="Закрыть" />
				</button>
				<div className={styles.header}>
					<h2>Регистрация в личном кабинете</h2>
				</div>
				<div className={styles.loginBlock}>
					<p className={styles.loginText}>Уже есть аккаунт?</p>
					<Button
						type="button"
						colorButton={ColorButton.GREEN}
						paddingStyle={{ topBottom: 2, leftRight: 16 }}
						onClick={handleLoginClick}
					>
						Войти
					</Button>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					{error && <div className={styles.error}>{error}</div>}
					<div className={styles.inputGroup}>
						<label htmlFor="second_name_ru">Фамилия</label>
						<input
							type="text"
							id="second_name_ru"
							name="second_name_ru"
							value={formData.second_name_ru}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="name_ru">Имя</label>
						<input
							type="text"
							id="name_ru"
							name="name_ru"
							value={formData.name_ru}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="phone">Номер телефона</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handlePhoneChange}
							required
							placeholder="+375"
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="email">Электронная почта</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password">Пароль</label>
						<div className={styles.passwordInput}>
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
								minLength={6}
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
					<div className={styles.buttonContainer}>
						<Button colorButton={ColorButton.BLUE} disabled={isLoading} type="submit">
							{isLoading ? "Регистрация..." : "Зарегистрироваться"}
						</Button>
					</div>
				</form>
			</div>
		</Modal>
	);
};
