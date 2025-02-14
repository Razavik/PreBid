import { FC } from "react";
import styles from "./DisplayControls.module.css";
import DropDownDisplay from "@components/ui/DropDownLists/DropDownDisplay/DropDownDisplay";

interface DisplayControlsProps {
	onItemsPerPageChange: (value: string) => void;
}

export const DisplayControls: FC<DisplayControlsProps> = ({ onItemsPerPageChange }) => {
	return (
		<div className={styles.displayControls}>
			<DropDownDisplay
				label="Отражать по"
				selects={[
					{ id: "10", payLoad: "10" },
					{ id: "20", payLoad: "20" },
					{ id: "30", payLoad: "30" },
				]}
				setItem={onItemsPerPageChange}
				width="40px"
				isToolbar={false}
			/>
		</div>
	);
};
