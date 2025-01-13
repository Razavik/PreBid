import { FC, useState, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import styles from "./AuctionsList.module.css";
import { CountryFilter } from "./CountryFilter/CountryFilter";
import { DateFilter } from "./DateFilter/DateFilter";
import { DisplayControls } from "./DisplayControls/DisplayControls";
import { auctionsService, Auction } from "@services/auctions.service";
import { AuctionCard } from "./AuctionCard/AuctionCard";

interface AuctionsListProps {
	countries: Array<{
		id: number;
		short_name_ru: string;
		name_ru: string;
	}>;
	onTotalResultsChange?: (total: number) => void;
}

interface GroupedAuctions {
	[date: string]: Auction[];
}

export const AuctionsList: FC<AuctionsListProps> = ({ countries, onTotalResultsChange }) => {
	const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
	const [startDate, setStartDate] = useState<Date | undefined>(new Date());
	const [endDate, setEndDate] = useState<Date | undefined>(undefined);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [results, setResults] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [auctions, setAuctions] = useState<Auction[]>([]);

	const fetchAuctions = async () => {
		try {
			const searchParams = {
				country_id: selectedCountry === "ALL" ? null : Number(selectedCountry),
				date_start_select: startDate ? format(startDate, "yyyy-MM-dd") : null,
				date_final_select: endDate ? format(endDate, "yyyy-MM-dd") : null,
			};

			const response = await auctionsService.getAuctions(1, itemsPerPage, searchParams);
			console.log("Полученные аукционы:", response.auctions);
			const totalResults = response.pagination.total_results;
			setResults(totalResults);
			setAuctions(response.auctions || []);
			onTotalResultsChange?.(totalResults);
		} catch (error) {
			console.error("Error fetching auctions:", error);
			setAuctions([]);
			setResults(0);
			onTotalResultsChange?.(0);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAuctions();
	}, [itemsPerPage, selectedCountry, startDate, endDate]);

	const handleDateChange = (dates: [Date | null, Date | null]) => {
		const [start, end] = dates;
		setStartDate(start || undefined);
		setEndDate(end || undefined);
		if (end) {
			setIsDatePickerOpen(false);
		}
	};

	const groupAuctionsByDate = (auctions: Auction[]): GroupedAuctions => {
		return auctions.reduce((groups, auction) => {
			const date = format(new Date(auction.date_start), "dd.MM.yyyy", { locale: ru });
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(auction);
			return groups;
		}, {} as GroupedAuctions);
	};

	const getResultsText = (count: number): string => {
		const lastDigit = count % 10;
		const lastTwoDigits = count % 100;

		if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
			return "результатов";
		}

		if (lastDigit === 1) {
			return "результат";
		}

		if (lastDigit >= 2 && lastDigit <= 4) {
			return "результата";
		}

		return "результатов";
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
					Найдено <span>{results} {getResultsText(results)}</span>
				</p>

				{isLoading ? (
					<div className={styles.loading}>Загрузка...</div>
				) : auctions && auctions.length > 0 ? (
					Object.entries(groupAuctionsByDate(auctions))
						.sort(([dateA], [dateB]) => {
							const timeA = new Date(dateA.split('.').reverse().join('-')).getTime();
							const timeB = new Date(dateB.split('.').reverse().join('-')).getTime();
							return timeA - timeB;
						})
						.map(([date, auctionsInGroup]) => (
							<div key={date} className={styles.dateGroup}>
								<h2 className={styles.dateTitle}>{date}</h2>
								<div className={styles.auctionsGroup}>
									{auctionsInGroup.map((auction) => (
										<AuctionCard key={auction.id} auction={auction} />
									))}
								</div>
							</div>
						))
				) : (
					<div>Аукционы не найдены</div>
				)}
			</div>
		</div>
	);
};
