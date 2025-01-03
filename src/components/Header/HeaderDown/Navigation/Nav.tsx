import { FC, ReactNode, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import style from "./nav.module.css";
import { LoginForm } from "../../../LoginForm/LoginForm";

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
		<>
			<ul className={style.navMenu}>
				{items.map((item) => (
					<li key={item.id} className={style.menuItem}>
						<Link to={item.path} onClick={(e) => handleClick(e, item)}>
							{item.content}
						</Link>
					</li>
				))}
			</ul>
			{showLoginModal && (
				<LoginForm
					isOpen={showLoginModal}
					onClose={handleCloseModal}
					onRegisterClick={handleRegisterClick}
				/>
			)}
		</>
	);
};

export default Nav;
