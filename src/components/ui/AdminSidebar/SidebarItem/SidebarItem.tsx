import { FC } from "react";
import styles from "./SidebarItem.module.css";
//import { ReactComponent as AuctionIcon } from "@assets/img/icons/auction.svg";

interface SidebarItemProps {
	children?: React.ReactNode;
	text: string;
	id: string;
	activeId: string;
	onClick: (id: string) => void;
	counter?: number;
}

export const SidebarItem: FC<SidebarItemProps> = ({ 
	children, 
	text, 
	id,
	activeId,
	onClick 
}) => {
	return (
		<div 
			className={`${styles.sidebarItem} ${id === activeId ? styles.active : ""}`} 
			onClick={() => onClick(id)}
		>
			<p>{text}</p>
			<span className={styles.icon}>{children}</span>
		</div>
	);
};
