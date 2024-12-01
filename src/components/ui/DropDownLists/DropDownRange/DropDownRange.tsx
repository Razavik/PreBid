import { FC, useState } from "react";
import styles from "./DropDownRange.module.css";
import DropDownItem from "../DropDownItem/DropDownItem";

interface DropDownRangeProps {
	startYear?: number;
	endYear?: number;
	onChange?: (range: { start: string; end: string }) => void;
	label?: string;
}

export const DropDownRange: FC<DropDownRangeProps> = ({
	startYear = new Date().getFullYear(),
	endYear = new Date().getFullYear(),
	onChange,
	label = "Год",
}) => {
	const [range, setRange] = useState({
		start: startYear.toString(),
		end: endYear.toString(),
	});

	// Generate years array (from current year to 10 years back)
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 11 }, (_, i) =>
		(currentYear - 10 + i).toString()
	);

	// Создаем массивы для обоих селекторов
	const startYearOptions = years.map((year) => ({
		id: year,
		payLoad: year,
	}));

	// Фильтруем года для второго селектора на основе выбранного начального года
	const endYearOptions = years
		.filter((year) => parseInt(year) >= parseInt(range.start))
		.map((year) => ({
			id: year,
			payLoad: year,
		}));

	const handleStartYearChange = (value: React.ReactNode) => {
		const newStart = value as string;
		// Если конечный год меньше начального, устанавливаем его равным начальному
		const newEnd =
			parseInt(range.end) < parseInt(newStart) ? newStart : range.end;

		const newRange = { start: newStart, end: newEnd };
		setRange(newRange);
		onChange?.(newRange);
	};

	const handleEndYearChange = (value: React.ReactNode) => {
		const newRange = { ...range, end: value as string };
		setRange(newRange);
		onChange?.(newRange);
	};

	// Стили для компонентов DropDownItem
	const dropDownStyles = {
		padding: "6px 8px",
		border: "1px solid #e0e0e0",
		borderRadius: "4px",
		gap: "7px",
		justifyContent: "center",
	};

	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<div className={styles.rangeContainer}>
				<DropDownItem
					title={range.start}
					selects={startYearOptions}
					onSelect={handleStartYearChange}
					styleAddition={dropDownStyles}
				/>
				<span className={styles.separator}>—</span>
				<DropDownItem
					title={range.end}
					selects={endYearOptions}
					onSelect={handleEndYearChange}
					styleAddition={dropDownStyles}
				/>
			</div>
		</div>
	);
};

export default DropDownRange;
