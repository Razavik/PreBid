import { FC, useEffect, useState } from "react";
import style from "./row.module.css";
import BookmarkButton from "@components/ui/BookmarkButton/BookmarkButton";
import Button, { ColorButton } from "@ui/Button/Button";
import { Transport } from "types/catalog.types";
import { catalogService } from "@services/catalog.service";
import { formatTimeLeft } from "@utils/formatTimeLeft";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

interface Props {
	product: Transport;
	isAuthenticated: boolean;
	userId?: number;
	onBid: (currentPrice: number, auctionId: number, transportId: number) => void;
}

const Row: FC<Props> = ({ product, isAuthenticated, userId, onBid }) => {
	const role = useSelector((state: RootState) => state.auth.role);
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
	const [isFavorite, setIsFavorite] = useState(product.general.favourite);
	const [pendingBookmark, setPendingBookmark] = useState(false);
	const [timeLeft, setTimeLeft] = useState<string>("");
	const [isPreBidActive, _] = useState(
		new Date() >= new Date(Date.parse(product.prebid_auction.date_start))
	);

	const lastBid = {
		price: product.bidHistory?.filter((bid) => bid.user_id === userId)?.[0]?.price,
		full_price: product.bidHistory?.filter((bid) => bid.user_id === userId)?.[0]?.full_price,
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLTableCellElement>) => {
		setTooltipPosition({ x: e.clientX - 10, y: e.clientY + 10 });
	};

	const handleFavoriteToggle = async () => {
		if (!isAuthenticated) {
			setPendingBookmark(true);
			const event = new CustomEvent("openLoginModal");
			document.querySelector("main")?.dispatchEvent(event);
			return;
		}

		try {
			await catalogService.addToFavorites(!isFavorite, product.general.id);
			setIsFavorite(!isFavorite);
		} catch (error) {
			console.error("Ошибка при изменении избранного:", error);
		}
	};

	useEffect(() => {
		const handleAuthSuccess = () => {
			if (pendingBookmark && isAuthenticated) {
				handleFavoriteToggle();
				setPendingBookmark(false);
			}
		};

		handleAuthSuccess();
	}, [isAuthenticated, pendingBookmark]);

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
			return "";
		}
		return "Текущая ставка:";
	};

	const getBidPrice = () => {
		if (!lastBid) return "Ставок ещё нет";

		const price =
			lastBid.full_price !== product.bid?.max_price ? lastBid.full_price : lastBid.price;

		return `${price}$`;
	};

	const YourBidInfo = () => {
		const shouldShow = !(
			isAuthenticated &&
			product.bid?.user?.id === userId &&
			product.bid?.max_price !== lastBid.full_price
		);

		if (!shouldShow) return null;

		return (
			<div>
				<span>Ваша ставка: </span>
				<span>{lastBid ? `${lastBid.full_price}$` : "Ставок ещё нет"}</span>
			</div>
		);
	};

	const renderContent = () => {
		if (isAuctionInProgress) {
			return <span>В данный момент проходят торги</span>;
		}

		if (!isAuthenticated) {
			return <span>Ставок ещё нет</span>;
		}

		if (shouldShowPriceInfo()) {
			return (
				<>
					<div>
						{getBidText() && <span>{getBidText()} </span>}
						<span>{getBidPrice()}</span>
					</div>
					<YourBidInfo />
				</>
			);
		}

		if (product.prebid_auction.date_final) {
			return (
				<>
					<span>{isPreBidActive ? "Дата конца аукциона:" : "Дата начала аукциона:"}</span>
					<br />
					<span className={style.timeLeft}>{timeLeft}</span>
				</>
			);
		}

		return null;
	};

	return (
		<tr key={product.general.id}>
			<td className={style.imageCell}>
				<div className={style.imageContainer}>
					<BookmarkButton
						isFavorite={isAuthenticated ? isFavorite : false}
						onClick={handleFavoriteToggle}
					/>
					<img src={product.general.photo.img} alt="car" />
				</div>
			</td>
			<td className={style.col2}>
				<a href={`/product-card/${product.general.id}`}>{product.general.id}</a>
			</td>
			<td className={style.col3}>{product.general.year}</td>
			<td className={style.col4}>{product.general.transportModel.transport_brand.name}</td>
			<td className={style.col5}>{product.general.transportModel.name}</td>
			<td className={style.col6}>{product.characteristic.volume}</td>
			<td className={style.col7}>{product.characteristic.odometer} km</td>
			<td className={style.col8}>{product.general.created_at}</td>
			<td
				className={style.col9}
				onMouseEnter={() => setShowTooltip(true)}
				onMouseLeave={() => setShowTooltip(false)}
				onMouseMove={handleMouseMove}
			>
				{renderContent()}
				{showTooltip && (
					<div
						className={style.tooltip}
						style={{
							left: tooltipPosition.x,
							top: tooltipPosition.y,
						}}
					>
						{renderContent()}
					</div>
				)}
			</td>
			<td className={style.col10}>
				<Button
					onClick={() =>
						onBid(
							Number(product.bidHistory[0].full_price),
							product.prebid_auction.id,
							product.general.id
						)
					}
					colorButton={ColorButton.BLUE}
					disabled={!isAuthenticated || role?.code !== "seller"}
				>
					Сделать ставку
				</Button>
			</td>
		</tr>
	);
};

export default Row;
