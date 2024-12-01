import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import style from "./nav.module.css";

type ItemContent = ReactNode | string;

export interface MenuItems {
	items: {
		id: string;
		content: ItemContent;
		path: string;
	}[];
}

const Nav: FC<MenuItems> = ({ items }) => {
	return (
		<ul className={style.navMenu}>
			{items.map((item) => (
				<li key={item.id} className={style.menuItem}>
					<Link to={item.path}>{item.content}</Link>
				</li>
			))}
		</ul>
	);
};

export default Nav;
