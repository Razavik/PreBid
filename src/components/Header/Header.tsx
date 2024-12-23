import { FC } from "react";
import HeaderUp from "./HeaderUp/HeaderUp";
import HeaderDown from "./HeaderDown/HeaderDown";

interface HeaderProps {
	onLoginClick: () => void;
}

const Header: FC<HeaderProps> = ({ onLoginClick }) => {
	return (
		<header>
			<HeaderUp />
			<HeaderDown onLoginClick={onLoginClick} />
		</header>
	);
};

export default Header;
