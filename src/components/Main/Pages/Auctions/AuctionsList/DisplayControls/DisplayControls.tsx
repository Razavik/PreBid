import { FC } from "react";
import styles from "./DisplayControls.module.css";

interface DisplayControlsProps {
	itemsPerPage: number;
	onItemsPerPageChange: (value: number) => void;
}

export const DisplayControls: FC<DisplayControlsProps> = ({
	itemsPerPage,
	onItemsPerPageChange,
}) => {
	return (
		<div className={styles.displayControls}>
			<span>Отражать по</span>
			<select
				value={itemsPerPage}
				onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
				className={styles.select}
			>
				<option value={10}>10</option>
				<option value={20}>20</option>
				<option value={30}>30</option>
			</select>
		</div>
	);
};
