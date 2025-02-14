import { FC, useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { RootState } from "@store/store";
import { authService } from "@services/auth.service";
import styles from "./UserDropdown.module.css";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import arrow from "@assets/img/icons/arrow.svg";
import burgerMenu from "@assets/img/icons/burger-menu.svg";
import { MenuItems } from "@components/Header/HeaderDown/Navigation/Nav";
import { useSelector } from "react-redux";

interface UserDropdownProps {
	menuItems?: MenuItems["items"];
	isAuthenticated?: boolean;
}

export const UserDropdown: FC<UserDropdownProps> = ({
	menuItems = [],
	isAuthenticated = false,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	const [name, setName] = useState<string | null>(null);
	const user = useSelector((state: RootState) => state.user.info);

	useEffect(() => {
		if (isAuthenticated && user) {
			let fullname = null;

			if (user.name_ru && user.second_name_ru) {
				fullname = (user.name_ru + " " + user.second_name_ru) as string;
				if (fullname.length > 9) {
					fullname = fullname.slice(0, 9).trim() + "...";
				}
			} else {
				fullname = "Админ";
			}

			setName(fullname);
		}
	}, [isAuthenticated, user]);

	useOnClickOutside(dropdownRef, () => setIsOpen(false));

	const handleLogout = async () => {
		await authService.logout();
		navigate("/");
		window.location.reload();
	};

	const handleProfileClick = () => {
		setIsOpen(false);
		navigate("/profile");
	};

	return (
		<div className={styles.dropdown} ref={dropdownRef}>
			<button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
				<div className={styles.desktop}>
					{name ? name : "Админ"}
					<img
						src={arrow}
						alt="Открыть меню"
						className={`${styles.arrow} ${isOpen ? styles.arrowUp : ""}`}
					/>
				</div>
				<img className={styles.burger} src={burgerMenu} alt="burger" />
			</button>
			<div className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
				<div className={styles.menuContent}>
					<div className={styles.adaptive}>
						{menuItems.map((item) => (
							<NavLink
								key={item.id}
								to={item.path}
								className={({ isActive }) =>
									isActive
										? `${styles.menuLink} ${styles.active}`
										: styles.menuLink
								}
								onClick={() => setIsOpen(false)}
							>
								{item.content}
							</NavLink>
						))}
						{isAuthenticated && <div className={styles.divider} />}
					</div>
					{isAuthenticated && (
						<>
							<button className={styles.menuButton} onClick={handleProfileClick}>
								Настройки
							</button>
							<button className={styles.menuButton} onClick={handleLogout}>
								Выйти
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
