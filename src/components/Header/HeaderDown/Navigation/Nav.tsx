import { FC, ReactNode, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import style from "./nav.module.css";
import { LoginForm } from "@components/LoginForm/LoginForm";

type ItemContent = ReactNode | string;

export interface MenuItems {
	items: {
		id: string;
		content: ItemContent;
		path: string;
		protected?: boolean;
	}[];
}

const Nav: FC<MenuItems> = ({ items }) => {
	const navigate = useNavigate();
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

	useEffect(() => {
		if (isAuthenticated && pendingNavigation) {
			navigate(pendingNavigation);
			setPendingNavigation(null);
			setShowLoginModal(false);
		}
	}, [isAuthenticated, pendingNavigation, navigate]);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: MenuItems["items"][0]) => {
		if (item.protected && !isAuthenticated) {
			e.preventDefault();
			setPendingNavigation(item.path);
			setShowLoginModal(true);
		}
	};

	const handleCloseModal = () => {
		setShowLoginModal(false);
		setPendingNavigation(null);
	};

	const handleRegisterClick = () => {
		setShowLoginModal(false);
		setPendingNavigation(null);
		navigate("/register");
	};

	return (
		<nav className={style.navMenu}>
			{items.map((item) => (
				<div key={item.id} className={style.menuItem}>
					<NavLink
						to={item.path}
						onClick={(e) => handleClick(e, item)}
						className={({ isActive }) => (isActive ? style.active : undefined)}
					>
						{item.content}
					</NavLink>
				</div>
			))}
			{showLoginModal && (
				<LoginForm
					isOpen={showLoginModal}
					onClose={handleCloseModal}
					onRegisterClick={handleRegisterClick}
				/>
			)}
		</nav>
	);
};

export default Nav;
