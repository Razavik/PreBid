import { FC } from "react";
import styles from "./adminSidebar.module.css";
import { SidebarItem } from "./SidebarItem/SidebarItem";

interface SidebarItem {
	id: string;
	text: string;
	icon?: React.ReactNode;
}

interface AdminSidebarProps {
	items: SidebarItem[];
	activeId: string;
	onItemClick: (id: string) => void;
}

export const AdminSidebar: FC<AdminSidebarProps> = ({ items, activeId, onItemClick }) => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.sidebarList}>
				{items.map((item) => (
					<>
						<SidebarItem
							key={item.id}
							id={item.id}
							text={item.text}
							activeId={activeId}
							onClick={onItemClick}
						>
							{item.icon}
						</SidebarItem>
						<div className={styles.line}></div>
					</>
				))}
			</div>
		</div>
	);
};
