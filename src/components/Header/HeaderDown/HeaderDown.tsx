import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
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
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const role = useSelector((state: RootState) => state.auth.role);

	let menuItems: MenuItems;

	if (!isAuthenticated) {
		menuItems = {
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
	} else if (role?.code === "admin") {
		menuItems = {
			items: [
				{ id: "auctions", content: "Аукционы", path: "/auctions", protected: true },
				{ id: "lots", content: "Лоты", path: "/lots" },
				{ id: "bidding", content: "Торги", path: "/bidding" },
				{ id: "finance", content: "Финансы", path: "/finance" },
				{ id: "delivery", content: "Доставки", path: "/delivery" },
				{ id: "statistic", content: "Статистика", path: "/statistic" },
			],
		};
	} else {
		menuItems = {
			items: [
				{ id: "catalog", content: "Каталог", path: "/" },
				{ id: "auctions", content: "Аукционы", path: "/auctions", protected: true },
				{ id: "my-sales", content: "Мои заказы", path: "/my-sales", protected: true },
				{ id: "my-buy", content: "Мои продажи", path: "/my-buy", protected: true },
				{ id: "my-rates", content: "Мои ставки", path: "/my-rates", protected: true },
				{
					id: "my-favorite",
					content: "Избранное",
					path: "/my-favorite",
					protected: true,
				},
			],
		};
	}

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 847 && isSearchExpanded) {
				setIsSearchExpanded(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isSearchExpanded]);

	return (
		<div className={style.headerDown}>
			<Container>
				{!isSearchExpanded ? (
					<div className={style.headerDownContent}>
						<div className={style.headerDownLeft}>
							<Link to="/">
								<img src={logo} alt="logo" className={style.logo} />
							</Link>
							<Nav items={menuItems.items} />
						</div>
						<div className={style.headerDownRight}>
							<SearchField
								placeholder="Поиск в каталоге по марке, модели, VIN"
								onSearchOpen={() => setIsSearchExpanded(true)}
								onSearchClose={() => setIsSearchExpanded(false)}
							/>
							{!isAuthenticated ? (
								<Button colorButton={ColorButton.BLUE} onClick={onLoginClick}>
									Вход / Регистрация
								</Button>
							) : (
								<UserDropdown
									menuItems={menuItems.items}
									isAuthenticated={isAuthenticated}
								/>
							)}
							{!isAuthenticated && (
								<div className={style.burger}>
									<UserDropdown
										menuItems={menuItems.items}
										isAuthenticated={false}
									/>
								</div>
							)}
						</div>
					</div>
				) : (
					<SearchField
						placeholder="Поиск в каталоге по марке, модели, VIN"
						onSearchOpen={() => setIsSearchExpanded(true)}
						onSearchClose={() => setIsSearchExpanded(false)}
						isActiveSearch={true}
					/>
				)}
			</Container>
		</div>
	);
};

export default HeaderDown;
