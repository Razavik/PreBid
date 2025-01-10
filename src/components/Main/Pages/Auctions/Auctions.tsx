import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import Container from "@ui/Container/Container";
import styles from "./auctions.module.css";
import { countriesService } from "@services/countries.service";
import { AuctionsSidebar } from "./AuctionsSidebar/AuctionsSidebar";
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
	const [isLoading, setIsLoading] = useState(true);
	const [activeId, setActiveId] = useState("list");
	const [results] = useState<number>(0);

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
		const fetchCountries = async () => {
			try {
				const data = await countriesService.getCountries();
				setCountries([
					{
						id: 0,
						short_name_en: null,
						name_en: null,
						short_name_ru: "ALL",
						name_ru: "Все",
					},
					...data,
				]);
			} catch (error) {
				console.error("Error fetching countries:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCountries();
	}, []);

	if (isLoading || !isAuthenticated) {
		return <div>Загрузка...</div>;
	}

	return (
		<Container>
			<div className={styles.auctionsPage}>
				{isAdmin && (
					<AuctionsSidebar
						items={sidebarItems}
						activeId={activeId}
						onItemClick={setActiveId}
					/>
				)}

				<div className={styles.mainContent}>
					{activeId === "add" ? (
						<AddAuction countries={countries.filter((country) => country.id !== 0)} />
					) : (
						<AuctionsList countries={countries} results={results} />
					)}
				</div>
			</div>
		</Container>
	);
};

export default Auctions;
