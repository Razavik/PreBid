import { FC, useState, useEffect } from "react";
import { Transport } from "types/catalog.types";
import style from "./card.module.css";
import Button, { ColorButton } from "@components/ui/Button/Button";
import BookmarkButton from "@components/ui/BookmarkButton/BookmarkButton";
import ImageSlider from "@components/ui/ImageSlider/ImageSlider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { catalogService } from "@services/catalog.service";
import { formatTimeLeft } from "@utils/formatTimeLeft";

interface Props {
	product: Transport;
	isAuthenticated: boolean;
	userId: number | null;
	onUpdate?: () => void;
	onBid: (currentPrice: number, auctionId: number, transportId: number) => void;
}

const Card: FC<Props> = ({ product, isAuthenticated, userId, onUpdate, onBid }) => {
	const [timeLeft, setTimeLeft] = useState<string>("");
	const now = new Date();
	const role = useSelector((state: RootState) => state.auth.role);

	const isPreBidActive = now >= new Date(Date.parse(product.prebid_auction.date_start));

	const lastBid = {
		price: product.bidHistory?.filter((bid) => bid.user_id === userId)?.[0]?.price,
		full_price: product.bidHistory?.filter((bid) => bid.user_id === userId)?.[0]?.full_price,
	};

	const [isFavorite, setIsFavorite] = useState(product.general.favourite);
	const [pendingBookmark, setPendingBookmark] = useState(false);

	useEffect(() => {
		const handleAuthSuccess = () => {
			if (pendingBookmark && isAuthenticated) {
				handleFavoriteToggle();
				setPendingBookmark(false);
			}
		};

		handleAuthSuccess();
	}, [isAuthenticated, pendingBookmark]);

	const handleFavoriteToggle = async () => {
		if (!isAuthenticated) {
			setPendingBookmark(true);
			const event = new CustomEvent("openLoginModal");
			document.querySelector("main")?.dispatchEvent(event);
			return;
		}

		try {
			await catalogService.toggleFavorite(!isFavorite, product.general.id);
			setIsFavorite(!isFavorite);
			onUpdate?.();
		} catch (error) {
			console.error("Ошибка при изменении избранного:", error);
		}
	};

	useEffect(() => {
		const updateTimeLeft = () => {
			setTimeLeft(formatTimeLeft(product.prebid_auction.date_final));
		};

		updateTimeLeft();
		const interval = setInterval(updateTimeLeft, 1000);

		return () => clearInterval(interval);
	}, [product.prebid_auction.date_final]);

	const isAuctionInProgress = isPreBidActive && product.prebid_auction.date_final === null;

	const shouldShowPriceInfo = () => {
		if (isAuctionInProgress) return false;
		return (
			product.prebid_auction.show_button_buy_now ||
			(!isAuthenticated && (!product.prebid_auction.date_final || isPreBidActive)) ||
			(isAuthenticated && !product.prebid_auction.date_final)
		);
	};

	const getBidText = () => {
		if (
			isAuthenticated &&
			product.bid?.user?.id === userId &&
			product.bid?.max_price !== lastBid.full_price
		) {
			return "Ваша ставка:";
		}
		return "Текущая ставка";
	};

	const getBidPrice = () => {
		if (!lastBid) return <span>Ставок ещё нет</span>;

		const price =
			lastBid.full_price !== product.bid?.max_price ? lastBid.full_price : lastBid.price;

		return `${price}$`;
	};

	const BidButton = () => (
		<Button
			colorButton={ColorButton.BLUE}
			style={{ padding: "6px 16px", fontSize: "14px" }}
			disabled={isAuthenticated && role?.code !== "seller"}
			onClick={() =>
				onBid(
					Number(product.bidHistory[0].full_price),
					product.prebid_auction.id,
					product.general.id
				)
			}
		>
			Сделать ставку
		</Button>
	);

	const YourBidInfo = () => {
		const shouldShow = !(
			isAuthenticated &&
			product.bid?.user?.id === userId &&
			product.bid?.max_price !== lastBid.full_price
		);

		if (!shouldShow) return null;

		return (
			<div className={style.yourRate}>
				<span>Ваша ставка: </span>
				<span>{lastBid ? `${lastBid.full_price}$` : "Ставок ещё нет"}</span>
			</div>
		);
	};

	const Timer = () => {
		if (product.prebid_auction.date_final) {
			return (
				<div className={style.date}>
					{isPreBidActive ? (
						<>
							<span>Дата конца аукциона:</span>
							<span>{timeLeft}</span>
						</>
					) : (
						<>
							<span>Дата начала аукциона:</span>
							<span>{timeLeft}</span>
						</>
					)}
				</div>
			);
		}
	};

	const renderContent = () => {
		if (isAuctionInProgress) {
			return (
				<div className={style.priceInfo}>
					<span className={style.bidStarted}>В данный момент проходят торги</span>
				</div>
			);
		}

		if (shouldShowPriceInfo()) {
			return (
				<div className={style.priceInfo}>
					<div className={style.priceAndButton}>
						<div className={style.price}>
							{isAuthenticated ? (
								<>
									<span>{getBidText()}</span>
									<span>{getBidPrice()}</span>
								</>
							) : (
								<>
									<span>Текущая ставка:</span>
									<span>Ставок ещё нет</span>
								</>
							)}
						</div>
						<div className={style.actions}>
							<BidButton />
						</div>
					</div>
					<YourBidInfo />
					<Timer />
				</div>
			);
		}
		return null;
	};

	return (
		<div key={`transport-${product.general.id}`} className={style.card}>
			<div className={style.photoContainer}>
				<BookmarkButton
					isFavorite={isAuthenticated ? isFavorite : false}
					onClick={handleFavoriteToggle}
				/>
				<Link to={`/product-card/${product.general.id}`}>
					<ImageSlider
						images={product.images.map((photo) => photo.img)}
						alt={`${product.general.transportModel.transport_brand.name} ${product.general.transportModel.name}`}
					/>
				</Link>
			</div>

			<div className={style.details}>
				<div className={style.textInfo}>
					<h3>
						{product.general.year} {product.general.transportModel.transport_brand.name}{" "}
						{product.general.transportModel.name}
					</h3>
					<p>
						<span>Номер лота</span>
						<Link to={`/product-card/${product.general.id}`}>{product.general.id}</Link>
					</p>
					<p>
						<span>Дата аукциона</span>
						<span>{product.general.created_at}</span>
					</p>
					<p>
						<span>Объём двигателя</span>
						<span>{product.characteristic.volume}</span>
					</p>
					<p>
						<span>Тип топлива</span>
						<span>{product.characteristic.fuel.name}</span>
					</p>
					<p>
						<span>Одометр</span>
						<span>
							{product.characteristic.odometer}{" "}
							{product.characteristic.calculationSystem.code}
						</span>
					</p>
				</div>
				<div className={style.contentWrapper}>
					{renderContent()}
					{!isAuthenticated && (
						<div className={style.authOverlay}>
							<div className={style.authMessage}>Доступно после авторизации</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Card;
