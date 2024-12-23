import { FC, useState, FormEvent } from "react";
import styles from "./RegisterForm.module.css";
import Button, { ColorButton } from "@ui/Button/Button";
import closeIcon from "@assets/img/icons/closeButton.svg";
import Modal from "@ui/Modal/Modal";
import { authService } from "@services/auth.service";
import { Input } from "@ui/inputs/Input/Input";
import { PhoneInput } from "@ui/inputs/PhoneInput/PhoneInput";
import { PasswordInput } from "@ui/inputs/PasswordInput/PasswordInput";

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

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (name: string) => (value: string) => {
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
						onClick={onLoginClick}
					>
						Войти
					</Button>
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					{error && <div className={styles.error}>{error}</div>}
					<Input
						type="text"
						id="second_name_ru"
						name="second_name_ru"
						label="Фамилия"
						value={formData.second_name_ru}
						onChange={(e) => handleChange("second_name_ru")(e.target.value)}
						required
					/>
					<Input
						type="text"
						id="name_ru"
						name="name_ru"
						label="Имя"
						value={formData.name_ru}
						onChange={(e) => handleChange("name_ru")(e.target.value)}
						required
					/>
					<PhoneInput
						value={formData.phone}
						onChange={handleChange("phone")}
						required
					/>
					<Input
						type="email"
						id="email"
						name="email"
						label="Электронная почта"
						value={formData.email}
						onChange={(e) => handleChange("email")(e.target.value)}
						required
					/>
					<PasswordInput
						value={formData.password}
						onChange={handleChange("password")}
						required
						minLength={6}
					/>
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
