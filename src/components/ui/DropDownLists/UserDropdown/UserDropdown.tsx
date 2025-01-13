import { FC, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@hooks/useUser";
import { authService } from "@services/auth.service";
import styles from "./UserDropdown.module.css";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import arrow from "@assets/img/icons/arrow.svg";

export const UserDropdown: FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const { user } = useUser();

	useOnClickOutside(dropdownRef, () => setIsOpen(false));

	const handleLogout = async () => {
		await authService.logout();
		navigate("/");
	};

	const handleProfileClick = () => {
		setIsOpen(false);
		navigate("/profile");
	};

	if (!user) return null;

	const fullName =
		[user.name_ru, user.second_name_ru].filter(Boolean).join(" ") || "Пользователь";

	return (
		<div className={styles.dropdown} ref={dropdownRef}>
			<button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
				{fullName}
				<img
					src={arrow}
					alt="Открыть меню"
					className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}
				/>
			</button>
			<div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
				<div className={styles.menuContent}>
					<button className={styles.menuButton} onClick={handleProfileClick}>
						Настройки
					</button>
					<button className={styles.menuButton} onClick={handleLogout}>
						Выйти
					</button>
				</div>
			</div>
		</div>
	);
};
