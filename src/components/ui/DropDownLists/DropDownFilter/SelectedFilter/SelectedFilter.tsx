import { FC } from "react";
import style from "./selectedFilter.module.css";
import removeIcon from "@assets/img/icons/removeFilter.svg";

interface SelectedFilterProps {
	text: string;
	onRemove: () => void;
}

const SelectedFilter: FC<SelectedFilterProps> = ({ text, onRemove }) => {
	return (
		<div className={style.selectedFilter}>
			<span className={style.filterText}>{text}</span>
			<button onClick={onRemove} className={style.removeButton}>
				<img src={removeIcon} alt="Remove filter" />
			</button>
		</div>
	);
};

export default SelectedFilter;
