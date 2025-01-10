import { FC } from "react";
import styles from "./DateFilter.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale/ru";

interface DateFilterProps {
	startDate: Date | undefined;
	endDate: Date | undefined;
	isOpen: boolean;
	onToggle: () => void;
	onDateChange: (dates: [Date | null, Date | null]) => void;
	onClose: () => void;
}

export const DateFilter: FC<DateFilterProps> = ({
	startDate,
	endDate,
	isOpen,
	onToggle,
	onDateChange,
	onClose,
}) => {
	const formatDateRange = () => {
		if (!startDate) return "";
		const formatDate = (date: Date) => {
			return date.toLocaleDateString("ru-RU", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			});
		};
		return endDate
			? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
			: formatDate(startDate);
	};

	return (
		<div className={styles.dateFilter}>
			<button className={styles.dateButton} onClick={onToggle}>
				Показать за период
			</button>
			<div className={styles.datePickerWrapper}>
				<DatePicker
					selected={startDate}
					onChange={onDateChange}
					startDate={startDate}
					endDate={endDate}
					selectsRange
					locale={ru}
					dateFormat="dd.MM.yyyy"
					placeholderText="ДД.ММ.ГГГГ - ДД.ММ.ГГГГ"
					className={styles.dateInput}
					open={isOpen}
					onClickOutside={onClose}
					shouldCloseOnSelect={false}
					customInput={<input value={formatDateRange()} onClick={onToggle} />}
				/>
			</div>
		</div>
	);
};
