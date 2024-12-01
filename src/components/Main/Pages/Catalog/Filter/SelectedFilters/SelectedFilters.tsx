import { FC } from "react";
import style from "./selectedFilters.module.css";
import removeIcon from "@assets/img/icons/removeFilter.svg";

export interface SelectedFilter {
    id: string;
    title: string;
    value: string;
}

interface Props {
    filters: SelectedFilter[];
    onRemove: (id: string) => void;
}

const SelectedFilters: FC<Props> = ({ filters, onRemove }) => {
    return (
        <div className={style.selectedFilters}>
            {filters.map((filter) => (
                <div key={filter.id} className={style.filterChip}>
                    <span className={style.filterText}>{filter.value}</span>
                    <button 
                        className={style.removeButton}
                        onClick={() => onRemove(filter.id)}
                        aria-label="Удалить фильтр"
                    >
                        <img src={removeIcon} alt="remove" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SelectedFilters;
