import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import style from "./headerdown.module.css";
import Container from "@ui/Container/Container";
import Nav, { MenuItems } from "./Navigation/Nav";
import SearchField from "@components/ui/SearchField/SearchField";
import Button, { ColorButton } from "@ui/Button/Button";
import logo from "@assets/img/icons/logo.svg";
import { UserDropdown } from "@ui/DropDownLists/UserDropdown/UserDropdown";

interface HeaderDownProps {
	onLoginClick: () => void;
}

const HeaderDown: FC<HeaderDownProps> = ({ onLoginClick }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	const menuItems: MenuItems = {
		items: [
			{ id: "catalog", content: "Каталог", path: "/" },
			{ id: "auctions", content: "Аукционы", path: "/auctions", protected: true },
			{ id: "tariffs", content: "Тарифы", path: "/tariffs" },
			{
				id: "how-it-works",
				content: "Как это работает",
				path: "/how-it-works",
			},
		],
	};

	return (
		<div className={style.headerDown}>
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
						<>
							{isAuthenticated ? (
								<UserDropdown />
							) : (
								<Button colorButton={ColorButton.BLUE} onClick={onLoginClick}>
									Вход / Регистрация
								</Button>
							)}
						</>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default HeaderDown;
