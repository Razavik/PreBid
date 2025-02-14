import { FC } from "react";
import style from "./filter.module.css";
import DropDownFilter, { SelectsInterface } from "@ui/DropDownLists/DropDownFilter/DropDownFilter";
import Button, { ColorButton } from "@ui/Button/Button";
import DropDownRange from "@ui/DropDownLists/DropDownRange/DropDownRange";

interface FilterProps {
	onClose?: () => void;
	filters: TransportFilters | null;
	onSearch: (searchParams: Record<string, any>) => void;
	onFilterChange: (filters: Record<string, any>) => void;
	selectedFilters: Record<string, any>;
	editingFilters: TransportFilters | null;
}

interface FilterOption extends SelectsInterface {
	payLoad: string;
}

export interface TransportFilters {
	transportBrand: FilterOption[];
	transportModel: FilterOption[];
	transportType: FilterOption[];
	transportDrive: FilterOption[];
	transportFuel: FilterOption[];
	transportTransmission: FilterOption[];
	transportHighlight: FilterOption[];
	transportColor: FilterOption[];
	odometer: number[];
	year: number[];
	keys: FilterOption[];
}

const Filter: FC<FilterProps> = ({
	onClose,
	filters,
	onSearch,
	onFilterChange,
	selectedFilters,
	editingFilters,
}) => {
	const handleFilterChange = (
		property: string,
		value: SelectsInterface | SelectsInterface[] | null
	) => {
		const newFilters = { ...selectedFilters };

		if (!value) {
			delete newFilters[property];
		} else if (Array.isArray(value)) {
			newFilters[property] = value.map((v) => Number(v.id));
		} else {
			newFilters[property] = Number(value.id);
		}

		onFilterChange(newFilters);
	};

	const handleOdometerChange = (range: { min: number; max: number } | null) => {
		const newFilters = { ...selectedFilters };
		if (range === null) {
			delete newFilters.odometer;
		} else {
			newFilters.odometer = range;
		}
		onFilterChange(newFilters);
	};

	const handleYearChange = (range: { min: number; max: number } | null) => {
		const newFilters = { ...selectedFilters };
		if (range === null) {
			delete newFilters.year;
		} else {
			newFilters.year = range;
		}
		onFilterChange(newFilters);
	};

	const handleSearch = () => {
		if (Object.keys(selectedFilters).length > 0) {
			const searchFilters = { ...selectedFilters };
			if (editingFilters?.year && !searchFilters.year) {
				searchFilters.year = { min: editingFilters.year[0], max: editingFilters.year[1] };
			}
			if (editingFilters?.odometer && !searchFilters.odometer) {
				searchFilters.odometer = {
					min: editingFilters.odometer[0],
					max: editingFilters.odometer[1],
				};
			}
			onSearch(searchFilters);
		}
		onClose?.();
	};

	if (!filters) {
		return null;
	}

	return (
		<div className={style.filter}>
			{onClose && (
				<button onClick={onClose} className={style.closeButton}>
					<svg
						width="20"
						height="20"
						viewBox="0 0 16 16"
						fill="currentColor"
						stroke="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeWidth="0.3"
							d="M5.854 2.146a.5.5 0 01.058.638l-.058.069-4.147 4.146H15.5a.5.5 0 010 1H1.707l4.147 4.146a.5.5 0 01-.707.707L.11 7.81l-.042-.062-.029-.059-.021-.062-.011-.054-.004-.031-.002-.053c.001-.021.002-.042.005-.063L.001 7.5l.003-.053.014-.075.021-.063.039-.076.04-.055 5.029-5.031a.5.5 0 01.707 0z"
						/>
					</svg>
				</button>
			)}
			<div className={style.filterBody}>
				<div className={style.filterItem}>
					<DropDownFilter
						label="Состояние"
						selects={filters.transportHighlight}
						isMulti
						onChange={(value) => handleFilterChange("transportHighlight", value)}
						value={
							selectedFilters.transportHighlight
								? filters.transportHighlight.filter((option) =>
										selectedFilters.transportHighlight.includes(
											Number(option.id)
										)
								  )
								: null
						}
					/>
				</div>
				<div className={style.filterItem}>
					<DropDownFilter
						label="Марка"
						selects={filters.transportBrand}
						onChange={(value) => handleFilterChange("transportBrand", value)}
						value={
							selectedFilters.transportBrand
								? filters.transportBrand.find(
										(option) =>
											option.id === selectedFilters.transportBrand.toString()
								  )
								: null
						}
					/>
				</div>
				<div className={style.filterItem}>
					<DropDownFilter
						label="Модель"
						selects={filters.transportModel}
						onChange={(value) => handleFilterChange("transportModel", value)}
						value={
							selectedFilters.transportModel
								? filters.transportModel.find(
										(option) =>
											option.id === selectedFilters.transportModel.toString()
								  )
								: null
						}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						label="Тип транспорта"
						selects={filters.transportType}
						onChange={(value) => handleFilterChange("transportType", value)}
						value={
							selectedFilters.transportType
								? filters.transportType.find(
										(option) =>
											option.id === selectedFilters.transportType.toString()
								  )
								: null
						}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						label="Трансмиссия"
						selects={filters.transportTransmission}
						isMulti
						onChange={(value) => handleFilterChange("transportTransmission", value)}
						value={
							selectedFilters.transportTransmission
								? filters.transportTransmission.filter((option) =>
										selectedFilters.transportTransmission.includes(
											Number(option.id)
										)
								  )
								: null
						}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownRange
						label="Одометр"
						min={filters.odometer[0]}
						max={filters.odometer[1]}
						hasSlider={true}
						onChange={handleOdometerChange}
						value={selectedFilters.odometer}
						unit="км"
					/>
				</div>
				<div className={style.filterItem}>
					<DropDownRange
						label="Год"
						min={filters.year[0]}
						max={filters.year[1]}
						hasSlider={false}
						onChange={handleYearChange}
						value={selectedFilters.year}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						label="Тип топлива"
						selects={filters.transportFuel}
						isMulti
						onChange={(value) => handleFilterChange("transportFuel", value)}
						value={
							selectedFilters.transportFuel
								? filters.transportFuel.filter((option) =>
										selectedFilters.transportFuel.includes(Number(option.id))
								  )
								: null
						}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						label="Привода"
						selects={filters.transportDrive}
						isMulti
						onChange={(value) => handleFilterChange("transportDrive", value)}
						value={
							selectedFilters.transportDrive
								? filters.transportDrive.filter((option) =>
										selectedFilters.transportDrive.includes(Number(option.id))
								  )
								: null
						}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						label="Цвет кузова"
						selects={filters.transportColor}
						isMulti
						onChange={(value) => handleFilterChange("transportColor", value)}
						value={
							selectedFilters.transportColor
								? filters.transportColor.filter((option) =>
										selectedFilters.transportColor.includes(Number(option.id))
								  )
								: null
						}
					/>
				</div>
				<div className={style.filterItem}>
					<DropDownFilter
						label="Ключи"
						selects={filters.keys}
						isMulti
						onChange={(value) => handleFilterChange("keys", value)}
						value={
							selectedFilters.keys
								? filters.keys.filter((option) =>
										selectedFilters.keys.includes(Number(option.id))
								  )
								: null
						}
					/>
				</div>
			</div>
			<Button colorButton={ColorButton.BLUE} isFullWidth onClick={handleSearch}>
				Применить фильтры
			</Button>
		</div>
	);
};

export default Filter;
