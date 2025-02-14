import { useState, useEffect, useRef } from "react";
import Container from "@ui/Container/Container";
import style from "./catalog.module.css";
import Filter, { TransportFilters } from "./Filter/Filter";
import Products from "./Products/Products";
import Pagination from "@ui/Pagination/Pagination";
import Toolbar from "./Toolbar/Toolbar";
import { catalogService } from "@services/catalog.service";
import BidModal from "@components/ui/BidModal/BidModal";
import { bidService } from "@services/bid.service";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
	category?: string;
}

interface BidModalState {
	isOpen: boolean;
	currentPrice: number;
	auctionId: number;
	transportId: number;
}

const Catalog = ({ category }: Props) => {
	const [filters, setFilters] = useState<TransportFilters | null>(null);
	const [countProducts, setCountProducts] = useState<number>(0);
	const [currentView, setCurrentView] = useState<"tabular" | "card">("card");
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [searchParams, setSearchParams] = useState<Record<string, any>>({});
	const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
	const [bidModal, setBidModal] = useState<BidModalState>({
		isOpen: false,
		currentPrice: 0,
		auctionId: 0,
		transportId: 0,
	});
	const filterRef = useRef<HTMLDivElement>(null);
	const queryClient = useQueryClient();

	const handleClickOutside = (event: MouseEvent) => {
		if (
			isMobileFilterOpen &&
			filterRef.current &&
			!filterRef.current.contains(event.target as Node)
		) {
			setIsClosing(true);
			setTimeout(() => {
				setShouldRender(false);
				setIsMobileFilterOpen(false);
				setIsClosing(false);
			}, 300);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMobileFilterOpen]);

	useEffect(() => {
		const fetchFilters = async () => {
			try {
				const response = await catalogService.getFilters();
				const mappedFilters = {
					transportBrand: response.content.filters.transportBrand.map((item) => ({
						id: item.id,
						payLoad: item.name,
					})),
					transportType: response.content.filters.transportType.map((item) => ({
						id: item.id,
						payLoad: item.name,
					})),
					transportDrive: response.content.filters.transportDrive.map((item) => ({
						id: item.id,
						payLoad: item.name,
					})),
					transportFuel: response.content.filters.transportFuel.map((item) => ({
						id: item.id,
						payLoad: item.name,
					})),
					transportTransmission: response.content.filters.transportTransmission.map(
						(item) => ({
							id: item.id,
							payLoad: item.name,
						})
					),
					transportModel: response.content.filters.transportModel.map((item) => ({
						id: item.id,
						payLoad: item.name,
					})),
					transportHighlight: response.content.filters.transportHighlight.map((item) => ({
						id: item.id,
						payLoad: item.name,
					})),
					transportColor: response.content.filters.transportColor.map((item) => ({
						id: item.id,
						payLoad: item.name,
					})),
					odometer: response.content.filters.odometer,
					year: response.content.filters.year,
					keys: response.content.filters.keys.map((item) => ({
						id: item.id,
						payLoad: item.value,
					})),
				};
				setFilters(mappedFilters);
			} catch (err) {
				setError("Ошибка при загрузке фильтров");
				console.error("Ошибка получения фильтров:", err);
			}
		};
		fetchFilters();
	}, []);

	if (error) {
		return <div className={style.filter}>{error}</div>;
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		console.log(`Переход на страницу ${page}`);
	};

	const toggleMobileFilter = () => {
		if (isMobileFilterOpen) {
			setIsClosing(true);
			setTimeout(() => {
				setShouldRender(false);
				setIsMobileFilterOpen(false);
				setIsClosing(false);
			}, 300);
		} else {
			setIsMobileFilterOpen(true);
			setShouldRender(true);
		}
	};

	const handleFilterRemove = (filterKey: string, value: number) => {
		const newFilters = { ...selectedFilters };

		if (filterKey === "odometer" || filterKey === "year") {
			delete newFilters[filterKey];
		} else if (Array.isArray(newFilters[filterKey])) {
			newFilters[filterKey] = newFilters[filterKey].filter((v: number) => v !== value);
			if (newFilters[filterKey].length === 0) {
				delete newFilters[filterKey];
			}
		} else {
			delete newFilters[filterKey];
		}

		setSelectedFilters(newFilters);
	};

	const handleResetFilters = () => {
		setSelectedFilters({
			transportBrand: null,
			transportModel: null,
			transportType: null,
			transportDrive: null,
			transportFuel: null,
			transportTransmission: null,
			transportHighlight: null,
			transportColor: null,
			keys: null,
			odometer: null,
			year: null,
		});
	};

	const handleSearch = (params: Record<string, any>) => {
		setSearchParams(params);
		setCurrentPage(1);
	};

	const handleOpenBidModal = (currentPrice: number, auctionId: number, transportId: number) => {
		setBidModal({
			isOpen: true,
			currentPrice,
			auctionId,
			transportId,
		});
	};

	const handleCloseBidModal = () => {
		setBidModal((prev) => ({ ...prev, isOpen: false }));
	};

	const handleBidSubmit = async (price: number, auctionId: number, transportId: number) => {
		try {
			await bidService.bid(auctionId, transportId, price);
			// Инвалидируем кеш после успешной ставки
			queryClient.invalidateQueries({ queryKey: ["products"] });
			handleCloseBidModal();
		} catch (error) {
			console.error("Ошибка при отправке ставки:", error);
		}
	};

	return (
		<section className={style.catalog}>
			<Container>
				<div className={style.catalogContent}>
					{countProducts != 0 && (
						<div className={style.desktopFilter}>
							<Filter
								filters={filters}
								onSearch={handleSearch}
								onFilterChange={setSelectedFilters}
								selectedFilters={selectedFilters}
								editingFilters={filters}
							/>
						</div>
					)}
					{shouldRender && (
						<div
							className={`${style.mobileFilter} ${isClosing ? style.closing : ""}`}
							ref={filterRef}
						>
							<Filter
								onClose={toggleMobileFilter}
								filters={filters}
								onSearch={handleSearch}
								onFilterChange={setSelectedFilters}
								selectedFilters={selectedFilters}
								editingFilters={filters}
							/>
						</div>
					)}
					<div className={style.catalogContentRight}>
						<Toolbar
							countProducts={countProducts}
							currentView={currentView}
							setView={setCurrentView}
							onFilterClick={toggleMobileFilter}
							selectedFilters={selectedFilters}
							filters={filters}
							onFilterRemove={handleFilterRemove}
							onResetFilters={handleResetFilters}
						/>
						<Products
							setCountProducts={setCountProducts}
							currentView={currentView}
							searchParams={searchParams}
							category={category}
							onBid={handleOpenBidModal}
						/>
						{countProducts > 10 && (
							<Pagination
								currentPage={currentPage}
								totalPages={100 / countProducts}
								onPageChange={handlePageChange}
							/>
						)}
					</div>
				</div>
				{!category && (
					<div className={style.textContent}>
						<p>
							На аукционах продаются легковые, грузовые автомобили и мотоциклы. Здесь
							Вы найдете не только автомобили с пробегом в прекрасном состоянии, но и
							автомобили после аварий или с техническими неполадками.
						</p>
						<p>
							Мы гарантируем качество продаваемых на аукционах автомобилей, поскольку
							все они подвергаются проверке со стороны независимых экспертов.
							Предоставляется информация о каждом б/у автомобиле: его пробег, история
							технического обслуживания, точный отчет о дефектах. У некоторых
							транспортных средств имеется заводская гарантия.
						</p>
						<p>
							Каждый аукцион автомобилей обновляется ежедневно, в неделю поступает
							более 7000 объявлений о транспортных средствах. Большой выбор
							автомобилей Audi, BMW, Renault, Toyota, Volkswagen, Mercedes-Benz,
							Škoda, Opel, Ford, Peugeot, Lexus, Citroen и автомобилей других
							производителей.
						</p>
						<div>
							Посредством платформы Exleasingcar транспортные средства продаются на
							автомобильных аукционах трех различных видов:
							<ul>
								<li>
									Aукцион фиксированной цены: Вы соглашаетесь с ценой,
									предлагаемой продавцом
								</li>
								<li>
									Закрытый аукцион: Вы предлагаете свою цену, но не видите
									предложений других участников торгов
								</li>
								<li>
									Oткрытый аукцион: Вы предлагаете на 100 евро больше, чем
									имеющаяся и видимая участникам торгов самая высокая на тот
									момент цена.
								</li>
							</ul>
						</div>
					</div>
				)}
				<BidModal
					isOpen={bidModal.isOpen}
					onClose={handleCloseBidModal}
					currentPrice={bidModal.currentPrice}
					auctionId={bidModal.auctionId}
					transportId={bidModal.transportId}
					onBidSubmit={handleBidSubmit}
				/>
			</Container>
		</section>
	);
};

export default Catalog;
