import { useState } from "react";
import style from "./filter.module.css";
import DropDownFilter from "@ui/DropDownLists/DropDownFilter/DropDownFilter";
import DropDownRange from "@ui/DropDownLists/DropDownRange/DropDownRange";
import SelectedFilters, {
	SelectedFilter,
} from "./SelectedFilters/SelectedFilters";

const vehicleTypes = [
	{ id: "1", payLoad: "Все транспортные средства" },
	{ id: "2", payLoad: "Легковые" },
	{ id: "3", payLoad: "Грузовые" },
	{ id: "4", payLoad: "Мотоциклы" },
];

const conditions = [
	{ id: "1", payLoad: "Новый" },
	{ id: "2", payLoad: "Б/У" },
];

const transmissions = [
	{ id: "1", payLoad: "Механическая" },
	{ id: "2", payLoad: "Автоматическая" },
	{ id: "3", payLoad: "Роботизированная" },
];

const fuelTypes = [
	{ id: "1", payLoad: "Бензин" },
	{ id: "2", payLoad: "Дизель" },
	{ id: "3", payLoad: "Электро" },
	{ id: "4", payLoad: "Гибрид" },
];

const driveTypes = [
	{ id: "1", payLoad: "Передний" },
	{ id: "2", payLoad: "Задний" },
	{ id: "3", payLoad: "Полный" },
];

const bodyTypes = [
	{ id: "1", payLoad: "Седан" },
	{ id: "2", payLoad: "Хэтчбек" },
	{ id: "3", payLoad: "Универсал" },
	{ id: "4", payLoad: "Внедорожник" },
	{ id: "5", payLoad: "Купе" },
	{ id: "6", payLoad: "Кабриолет" },
	{ id: "7", payLoad: "Пикап" },
	{ id: "8", payLoad: "Минивэн" },
];

const cylinders = [
	{ id: "1", payLoad: "2" },
	{ id: "2", payLoad: "3" },
	{ id: "3", payLoad: "4" },
	{ id: "4", payLoad: "5" },
	{ id: "5", payLoad: "6" },
	{ id: "6", payLoad: "8" },
	{ id: "7", payLoad: "12" },
];

const statuses = [
	{ id: "1", payLoad: "В продаже" },
	{ id: "2", payLoad: "В пути" },
	{ id: "3", payLoad: "Продано" },
];

const brands = [
	{ id: "1", payLoad: "Audi" },
	{ id: "2", payLoad: "BMW" },
	{ id: "3", payLoad: "Mercedes-Benz" },
	{ id: "4", payLoad: "Toyota" },
	{ id: "5", payLoad: "Volkswagen" },
	{ id: "6", payLoad: "Honda" },
	{ id: "7", payLoad: "Hyundai" },
	{ id: "8", payLoad: "Kia" },
];

const models = [
	{ id: "1", payLoad: "A3" },
	{ id: "2", payLoad: "A4" },
	{ id: "3", payLoad: "A6" },
	{ id: "4", payLoad: "Q5" },
	{ id: "5", payLoad: "Q7" },
];

const Filter = () => {
	const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

	const getSelectedValuesForTitle = (title: string) => {
		return selectedFilters
			.filter(filter => filter.title === title)
			.map(filter => filter.value);
	};

	const handleFilterSelect = (title: string, value: string) => {
		const newFilter: SelectedFilter = {
			id: `${title}-${value}`,
			title,
			value,
		};

		const existingFilter = selectedFilters.find(
			(filter) => filter.id === newFilter.id
		);

		if (existingFilter) {
			setSelectedFilters((prev) =>
				prev.filter((filter) => filter.id !== newFilter.id)
			);
		} else {
			setSelectedFilters((prev) => [...prev, newFilter]);
		}
	};

	const handleFilterRemove = (id: string) => {
		setSelectedFilters((prev) => prev.filter((filter) => filter.id !== id));
	};

	const handleResetAll = () => {
		setSelectedFilters([]);
	};

	const handleYearRangeChange = (range: { start: string; end: string }) => {
		const yearRangeId = `Год выпуска-${range.start}-${range.end}`;

		const filtersWithoutYear = selectedFilters.filter(
			(filter) => !filter.id.startsWith("Год выпуска-")
		);

		setSelectedFilters([
			...filtersWithoutYear,
			{
				id: yearRangeId,
				title: "Год выпуска",
				value: `${range.start} - ${range.end}`,
			},
		]);
	};

	return (
		<div className={style.filter}>
			<div className={style.header}>
				<h3>Фильтры</h3>
				<button className={style.resetButton} onClick={handleResetAll}>
					Сбросить все
				</button>
			</div>

			{selectedFilters.length > 0 && (
				<SelectedFilters
					filters={selectedFilters}
					onRemove={handleFilterRemove}
				/>
			)}

			<div className={style.filterBody}>
				<div className={style.filterItem}>
					<DropDownFilter
						title="Все транспортные средства"
						selects={vehicleTypes}
						onSelect={(value) => handleFilterSelect("Тип", value as string)}
						selectedValues={getSelectedValuesForTitle("Тип")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Состояние"
						selects={conditions}
						onSelect={(value) => handleFilterSelect("Состояние", value as string)}
						selectedValues={getSelectedValuesForTitle("Состояние")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownRange
						onChange={handleYearRangeChange}
						label="Одометр"
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownRange
						onChange={handleYearRangeChange}
						label="Год выпуска"
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Марка"
						selects={brands}
						onSelect={(value) => handleFilterSelect("Марка", value as string)}
						selectedValues={getSelectedValuesForTitle("Марка")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Модель"
						selects={models}
						onSelect={(value) => handleFilterSelect("Модель", value as string)}
						selectedValues={getSelectedValuesForTitle("Модель")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Тип двигателя"
						selects={fuelTypes}
						onSelect={(value) => handleFilterSelect("Тип двигателя", value as string)}
						selectedValues={getSelectedValuesForTitle("Тип двигателя")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Передача"
						selects={transmissions}
						onSelect={(value) => handleFilterSelect("Коробка передач", value as string)}
						selectedValues={getSelectedValuesForTitle("Коробка передач")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Тип топлива"
						selects={fuelTypes}
						onSelect={(value) => handleFilterSelect("Тип топлива", value as string)}
						selectedValues={getSelectedValuesForTitle("Тип топлива")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Приводной механизм"
						selects={driveTypes}
						onSelect={(value) => handleFilterSelect("Привод", value as string)}
						selectedValues={getSelectedValuesForTitle("Привод")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Цилиндр"
						selects={cylinders}
						onSelect={(value) => handleFilterSelect("Цилиндр", value as string)}
						selectedValues={getSelectedValuesForTitle("Цилиндр")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Тип кузова"
						selects={bodyTypes}
						onSelect={(value) => handleFilterSelect("Тип кузова", value as string)}
						selectedValues={getSelectedValuesForTitle("Тип кузова")}
					/>
				</div>

				<div className={style.filterItem}>
					<DropDownFilter
						title="Статус"
						selects={statuses}
						onSelect={(value) => handleFilterSelect("Статус", value as string)}
						selectedValues={getSelectedValuesForTitle("Статус")}
					/>
				</div>
			</div>

			<button className={style.showResults}>Показать результаты</button>
		</div>
	);
};

export default Filter;
