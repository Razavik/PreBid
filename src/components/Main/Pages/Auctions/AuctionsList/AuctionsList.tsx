import { FC, useState } from "react";
import styles from "./AuctionsList.module.css";
import { CountryFilter } from "./CountryFilter/CountryFilter";
import { DateFilter } from "./DateFilter/DateFilter";
import { DisplayControls } from "./DisplayControls/DisplayControls";
import { AuctionItems } from "./AuctionItems/AuctionItems";

interface AuctionsListProps {
	countries: Array<{
		id: number;
		short_name_ru: string;
		name_ru: string;
	}>;
	results: number;
}

export const AuctionsList: FC<AuctionsListProps> = ({ countries, results }) => {
	const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);

	const handleDateChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start || undefined);
		setEndDate(end || undefined);
		if (end) {
			setIsDatePickerOpen(false);
		}
	};

	return (
		<div className={styles.auctionsListContainer}>
			<h1 className={styles.title}>Аукционы</h1>

			<CountryFilter
				countries={countries}
				selectedCountry={selectedCountry}
				onCountrySelect={setSelectedCountry}
			/>

			<div className={styles.controls}>
				<DateFilter
					startDate={startDate}
					endDate={endDate}
					isOpen={isDatePickerOpen}
					onToggle={() => setIsDatePickerOpen(!isDatePickerOpen)}
					onDateChange={handleDateChange}
					onClose={() => setIsDatePickerOpen(false)}
				/>

				<DisplayControls
					itemsPerPage={itemsPerPage}
					onItemsPerPageChange={setItemsPerPage}
				/>
			</div>

			<div className={styles.results}>
				<p>
					Найдено <span>{results} результато</span>в
				</p>

				<AuctionItems results={results} />
			</div>
		</div>
	);
};
