import React, { useState, useEffect } from "react";
import style from "./bidblock.module.css";
import { formatTimeLeft } from "@utils/formatTimeLeft";
import minus from "@assets/img/icons/minus.png";
import plus from "@assets/img/icons/plus.png";
import Button, { ColorButton } from "@ui/Button/Button";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { BidHistoryItem } from "types/catalog.types";

interface BidBlockProps {
	currentBid: {
		price: string;
		max_price: string;
		user: {
			id: number;
			email: string;
		};
	};
	lastBid: BidHistoryItem;
	auctionEnd: string;
	onBidSubmit: (price: number) => void;
	isAuthenticated: boolean;
}

export const BidBlock: React.FC<BidBlockProps> = ({
	currentBid,
	lastBid,
	auctionEnd,
	onBidSubmit,
	isAuthenticated,
}) => {
	const [timeLeft, setTimeLeft] = useState("");

	const userId = useSelector((state: RootState) => state.user.info?.id);

	const currentPrice = currentBid.user.id == userId ? lastBid.full_price : currentBid.max_price;
	const [bidAmount, setBidAmount] = useState(Number(currentPrice) + 5);

	// Обновляем bidAmount при изменении currentPrice
	useEffect(() => {
		setBidAmount(Number(currentPrice) + 5);
	}, [currentPrice]);

	useEffect(() => {
		const updateTimeLeft = () => {
			setTimeLeft(formatTimeLeft(auctionEnd));
		};

		updateTimeLeft();
		const interval = setInterval(updateTimeLeft, 1000);

		return () => clearInterval(interval);
	}, [auctionEnd]);

	const handleIncrement = () => {
		setBidAmount((prev) => prev + 1);
	};

	const handleDecrement = () => {
		setBidAmount((prev) => prev - 1);
	};

	return (
		<div className={style.bidBlock}>
			<h3 className={style.currentBid}>
				{userId == currentBid.user.id
					? `Ваша ставка: ${lastBid.full_price}`
					: `Текущая ставка: ${currentBid.max_price}`}
				$
			</h3>
			<div className={style.bidInput}>
				<input
					type="number"
					value={bidAmount}
					onChange={(e) => setBidAmount(Number(e.target.value))}
				/>
				<button onClick={handleDecrement} className={style.bidButton}>
					<img src={minus} alt="minus" />
				</button>
				<button onClick={handleIncrement} className={style.bidButton}>
					<img src={plus} alt="plus" />
				</button>
			</div>
			<Button
				onClick={() => onBidSubmit(bidAmount)}
				colorButton={ColorButton.GREEN}
				isFullWidth
			>
				Сделать ставку
			</Button>
			<p className={style.timeLeft}>
				<span>До конца аукциона:</span> <span className={style.timer}>{timeLeft}</span>
			</p>
			{!isAuthenticated && (
				<div className={style.authOverlay}>
					<div className={style.authMessage}>Доступно после авторизации</div>
				</div>
			)}
		</div>
	);
};
