import { FC } from "react";
import style from "./headerdown.module.css";
import Container from "../../ui/Container/Container";
import Nav, { MenuItems } from "./Navigation/Nav";
import SearchField from "../../ui/Input/SearchField";
import Button, { ColorButton } from "../../ui/Button/Button";

const HeaderDown: FC = () => {
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

	return (
		<div>
			<Container>
				<div className={style.headerDownContent}>
					<div className={style.headerDownLeft}>
						<div className={style.headerDownContent}>
							<a className={style.logo} href="#">
								<img
									src="/src/assets/img/icons/logo.svg"
									alt="logo"
								/>
							</a>
						</div>
						<Nav items={menuItems.items} />
					</div>
					<div className={style.headerDownRight}>
						<SearchField placeholder="Поиск" />
						<Button colorButton={ColorButton.BLUE} isLarge={true}>
							Вход / Регистрация
						</Button>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default HeaderDown;
