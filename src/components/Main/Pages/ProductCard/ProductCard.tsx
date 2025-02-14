import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import style from "./productcard.module.css";
import { Transport } from "types/catalog.types";
import { catalogService } from "@services/catalog.service";
import Container from "@components/ui/Container/Container";
import { Characteristics } from "./Characteristics/Characteristics";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { BidBlock } from "./BidBlock/BidBlock";
import { DeliveryInfo } from "./DeliveryInfo/DeliveryInfo";
import calculator from "@assets/img/icons/calculator.png";
import favorite from "@assets/img/icons/favourite.png";
import share from "@assets/img/icons/share.png";
import ImageSlider from "./ImageSlider/ImageSlider";
import { bidService } from "@services/bid.service";
import Calculator from "./Calculator/Calculator";

export const ProductCard: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [transport, setTransport] = useState<Transport | null>(null);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const [isFavorite, setIsFavorite] = useState(transport?.general.favourite);
	const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

	useEffect(() => {
		const fetchTransport = async () => {
			if (!id) {
				navigate("/error404", { replace: true });
				return;
			}

			try {
				const response = await catalogService.getTransportById(id, isAuthenticated);

				if (!response || !response.content) {
					navigate("/error404", { replace: true });
					return;
				}

				setTransport(response.content);
			} catch (error) {
				if (error instanceof AxiosError && error.response?.status) {
					const status = error.response.status;

					if (status === 404 || status >= 500) {
						navigate("/error404", { replace: true });
					} else {
						console.error("Ошибка при загрузке товара:", error.message);
					}
				} else {
					console.error("Неизвестная ошибка:", error);
					navigate("/error404", { replace: true });
				}
			}
		};

		fetchTransport();
	}, [id, navigate]);

	const handleFavoriteClick = () => {
		if (!isAuthenticated) return;
		setIsFavorite(!isFavorite);
	};

	const handleBid = async (price: number) => {
		if (!transport || !id) return;

		try {
			await bidService.bid(transport.prebid_auction.id, transport.general.id, price);
			const response = await catalogService.getTransportById(id, isAuthenticated);
			setTransport(response.content);
		} catch (error) {
			console.error("Ошибка при отправке ставки:", error);
		}
	};

	if (transport === null) return null;

	return (
		<div className={style.productCard}>
			<Container>
				<div className={style.productCard}>
					<button onClick={() => navigate(-1)} className={style.backButton}>
						<svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">
							<path d="M10.872 3.166a.5.5 0 00-.634-.091l-.072.054-5 4.5a.5.5 0 00-.065.672l.065.071 5 4.5a.5.5 0 00.73-.677l-.061-.066L6.249 8l4.586-4.127a.5.5 0 00.091-.634l-.054-.072z" />
						</svg>
						<span>Назад к результатам</span>
					</button>
					<div className={style.title}>
						<h1>{transport.general.name}</h1>
						<div className={style.titleRight}>
							<button className={style.favorite} onClick={handleFavoriteClick}>
								<img src={favorite} alt="favorite" />
								{isFavorite ? (
									<span>В избранном</span>
								) : (
									<span>Добавить в избранное</span>
								)}
							</button>
							<button className={style.share}>
								<img src={share} alt="share" />
								<span>Поделиться</span>
							</button>
						</div>
					</div>
					<div className={style.productCardInner}>
						<ImageSlider images={transport.images} />
						<div className={style.productCardContent}>
							<Characteristics transport={transport} />
							<div className={style.other}>
								<BidBlock
									currentBid={transport.bid}
									lastBid={transport.bidHistory[0]}
									auctionEnd={transport.prebid_auction.date_final}
									onBidSubmit={handleBid}
									isAuthenticated={isAuthenticated}
								/>
								<button
									className={style.calculatorButton}
									onClick={() => setIsCalculatorOpen(true)}
								>
									<img src={calculator} alt="calculator" />
									<span>Калькулятор стоимости</span>
								</button>
								<DeliveryInfo
									delivery={transport.delivery}
									dateStart={transport.prebid_auction.date_start}
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
			{transport && (
				<Calculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
			)}
		</div>
	);
};
