import { FC, useState } from "react";
import Container from "@ui/Container/Container";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./auctions.module.css";
import { ru } from "date-fns/locale/ru";

interface CountryFilter {
	id: string;
	name: string;
}

const countries: CountryFilter[] = [
	{ id: "all", name: "Все" },
	{ id: "usa", name: "США" },
	{ id: "canada", name: "Канада" },
	{ id: "lithuania", name: "Lithuania" },
	{ id: "belarus", name: "Belarus" },
	{ id: "georgia", name: "Georgia" },
	{ id: "kazakhstan", name: "Kazahstan" },
	{ id: "dubai", name: "Dubai" },
	{ id: "russia", name: "Russia" },
	{ id: "netherlands", name: "Netherlands" },
	{ id: "uae", name: "UAE (Emirates)" },
	{ id: "turkey", name: "Turkey" },
];

const Auctions: FC = () => {
	const [selectedCountry, setSelectedCountry] = useState<string>("all");
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [results] = useState<number>(0);

	const handleDateChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start || undefined);
		setEndDate(end || undefined);
		if (end) {
			setIsDatePickerOpen(false);
		}
	};

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
		<div className={styles.auctionsPage}>
			<Container>
				<h1 className={styles.title}>Аукционы</h1>

				{/* Фильтр по странам */}
				<div className={styles.countryFilter}>
					{countries.map((country) => (
						<button
							key={country.id}
							className={`${styles.countryButton} ${
								selectedCountry === country.id ? styles.active : ""
							}`}
							onClick={() => setSelectedCountry(country.id)}
						>
							{country.name}
						</button>
					))}
				</div>

				{/* Фильтры и управление */}
				<div className={styles.controls}>
					<div className={styles.dateFilter}>
						<button
							className={styles.dateButton}
							onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
						>
							Показать за период
						</button>
						<div className={styles.datePickerWrapper}>
							<DatePicker
								selected={startDate}
								onChange={handleDateChange}
								startDate={startDate}
								endDate={endDate}
								selectsRange
								locale={ru}
								dateFormat="dd.MM.yyyy"
								placeholderText="ДД.ММ.ГГГГ - ДД.ММ.ГГГГ"
								className={styles.dateInput}
								open={isDatePickerOpen}
								onClickOutside={() => setIsDatePickerOpen(false)}
								customInput={
									<input
										value={formatDateRange()}
										onClick={() => setIsDatePickerOpen(true)}
										readOnly
									/>
								}
							/>
						</div>
					</div>

					<div className={styles.displayControls}>
						<span>Отражать по</span>
						<select
							value={itemsPerPage}
							onChange={(e) => setItemsPerPage(Number(e.target.value))}
							className={styles.select}
						>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={30}>30</option>
							<option value={50}>50</option>
						</select>
					</div>
				</div>

				{/* Результаты */}
				<div className={styles.results}>
					<p>
						Найдено <span>{results} результато</span>в
					</p>

					{/* Здесь будет список аукционов */}
					<div className={styles.auctionsList}>
						{results === 0 ? (
							<p className={styles.noResults}>Аукционы не найдены</p>
						) : null}
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Auctions;
