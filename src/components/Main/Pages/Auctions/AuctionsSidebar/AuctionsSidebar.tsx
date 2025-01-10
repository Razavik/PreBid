import { FC } from "react";
import styles from "./AuctionsSidebar.module.css";
import { SidebarItem } from "./SidebarItem/SidebarItem";

interface SidebarItem {
	id: string;
	text: string;
	icon?: React.ReactNode;
}

interface AuctionsSidebarProps {
	items: SidebarItem[];
	activeId: string;
	onItemClick: (id: string) => void;
}

export const AuctionsSidebar: FC<AuctionsSidebarProps> = ({ items, activeId, onItemClick }) => {
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
