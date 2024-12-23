import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import style from "./headerdown.module.css";
import Container from "@ui/Container/Container";
import Nav, { MenuItems } from "./Navigation/Nav";
import SearchField from "@ui/Input/SearchField";
import Button, { ColorButton } from "@ui/Button/Button";
import { authService } from "@services/auth.service";
import logo from "@assets/img/icons/logo.svg";

interface HeaderDownProps {
	onLoginClick: () => void;
}

const HeaderDown: FC<HeaderDownProps> = ({ onLoginClick }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	const menuItems: MenuItems = {
		items: [
			{ id: "catalog", content: "Каталог", path: "/" },
			{ id: "auctions", content: "Аукционы", path: "/auctions" },
			{ id: "tariffs", content: "Тарифы", path: "/tariffs" },
			{
				id: "how-it-works",
				content: "Как это работает",
				path: "/how-it-works",
			},
		],
	};

	const handleLogout = () => {
		authService.logout();
	};

	return (
		<div>
			<Container>
				<div className={style.headerDownContent}>
					<div className={style.headerDownLeft}>
						<a className={style.logo} href="#">
							<img src={logo} alt="logo" />
						</a>
						<Nav items={menuItems.items} />
					</div>
					<div className={style.headerDownRight}>
						<SearchField placeholder="Поиск" />
						{isAuthenticated ? (
							<Button
								colorButton={ColorButton.BLUE}
								isLarge={true}
								onClick={handleLogout}
							>
								Выйти
							</Button>
						) : (
							<Button
								colorButton={ColorButton.BLUE}
								isLarge={true}
								onClick={onLoginClick}
							>
								Вход / Регистрация
							</Button>
						)}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default HeaderDown;
