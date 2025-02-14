import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import Container from "@ui/Container/Container";
import styles from "./auctions.module.css";
import { countriesService } from "@services/countries.service";
import { AdminSidebar } from "@ui/AdminSidebar/AdminSidebar";
import { auctionsService } from "@services/auctions.service";
import { AddAuction } from "./AddAuction/AddAuction";
import { AuctionsList } from "./AuctionsList/AuctionsList";
import icon from "@assets/img/icons/ion_car-sport-outline.svg";

interface Country {
	id: number;
	short_name_en: string | null;
	name_en: string | null;
	short_name_ru: string;
	name_ru: string;
}

const Auctions: FC = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const [allCountries, setAllCountries] = useState<Country[]>([]);
	const [activeId, setActiveId] = useState("list");
	const [results, setResults] = useState<number>(0);

	const sidebarItems = [
		{
			id: "add",
			text: "Добавить аукцион",
			icon: <img src={icon} alt="icon" />,
		},
		{
			id: "list",
			text: "Список аукционов",
			icon: results,
		},
	];

	const role = useSelector((state: RootState) => state.auth.role);
	const isAdmin = role?.code === "admin";
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				// Получаем страны
				const countriesData = await countriesService.getCountries();
				setCountries(countriesData);
				setAllCountries([
					{
						id: 0,
						short_name_en: null,
						name_en: null,
						short_name_ru: "ALL",
						name_ru: "Все",
					},
					...countriesData,
				]);

				// Получаем количество аукционов
				const auctionsData = await auctionsService.getAuctions(1, 10);
				setResults(auctionsData.pagination.total_results);
			} catch (error) {
				console.error("Ошибка получения данных:", error);
			}
		};

		fetchInitialData();
	}, []);

	const handleAuctionCreated = () => {
		setActiveId("list");
	};

	const renderContent = () => {
		switch (activeId) {
			case "add":
				return <AddAuction countries={countries} onSuccess={handleAuctionCreated} />;
			case "list":
				return <AuctionsList countries={allCountries} onTotalResultsChange={setResults} />;
			default:
				return null;
		}
	};

	if (!isAuthenticated) {
		return null;
	}

	return (
		<Container>
			<div className={styles.auctions}>
				{isAdmin && (
					<AdminSidebar
						items={sidebarItems}
						activeId={activeId}
						onItemClick={setActiveId}
					/>
				)}
				<div className={styles.content}>{renderContent()}</div>
			</div>
		</Container>
	);
};

export default Auctions;
