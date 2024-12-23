import { FC } from "react";
import styles from "./Header.module.css";
import HeaderDown from "./HeaderDown/HeaderDown";
import HeaderUp from "./HeaderUp/HeaderUp";

interface HeaderProps {
	onLoginClick: () => void;
}

const Header: FC<HeaderProps> = ({ onLoginClick }) => {
	return (
		<header className={styles.header}>
			<HeaderUp />
			<HeaderDown onLoginClick={onLoginClick} />
		</header>
	);
};

export default Header;
