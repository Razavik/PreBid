import React, { useState, useEffect } from "react";
import styles from "./bidmodal.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { bidService } from "@services/bid.service";
import Button, { ColorButton } from "../Button/Button";
import closeButton from "@assets/img/icons/closeButton.svg";
import plusButton from "@assets/img/icons/plus.png";
import minusButton from "@assets/img/icons/minus.png";

interface BidModalProps {
	isOpen: boolean;
	onClose: () => void;
	currentPrice: number;
	auctionId: number;
	transportId: number;
	onBidSubmit?: (price: number, auctionId: number, transportId: number) => void;
}

const BidModal: React.FC<BidModalProps> = ({
	isOpen,
	onClose,
	currentPrice,
	auctionId,
	transportId,
	onBidSubmit,
}) => {
	const [bidAmount, setBidAmount] = useState(currentPrice + 10);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	useEffect(() => {
		setBidAmount(currentPrice + 10);
	}, [currentPrice]);

	const handleSubmit = async () => {
		if (!isAuthenticated) return;

		try {
			await bidService.bid(auctionId, transportId, bidAmount);
			onBidSubmit?.(bidAmount, auctionId, transportId);
			onClose();
		} catch (error) {
			console.error("Ошибка при отправке ставки:", error);
		}
	};

	const handleIncrement = () => {
		setBidAmount((prev) => prev + 1);
	};

	const handleDecrement = () => {
		setBidAmount((prev) => prev - 1);
	};

	if (!isOpen) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={onClose}>
					<img src={closeButton} alt="close" />
				</button>
				<h2 className={styles.title}>Сделать ставку</h2>
				<div className={styles.content}>
					<p className={styles.currentBid}>
						Текущая ставка: <span>{currentPrice}$</span>
					</p>
					<div className={styles.bidInput}>
						<div className={styles.inputBox}>
							<div className={styles.dollar}>$</div>
							<input
								type="number"
								value={bidAmount}
								onChange={(e) => {
									const value = Number(e.target.value);
									setBidAmount(
										value < currentPrice + 1 ? currentPrice + 1 : value
									);
								}}
								step={1}
							/>
						</div>
						<div className={styles.buttons}>
							<button onClick={handleDecrement} className={styles.bidButton}>
								<img src={minusButton} alt="minus" />
							</button>
							<button onClick={handleIncrement} className={styles.bidButton}>
								<img src={plusButton} alt="plus" />
							</button>
						</div>
					</div>
					<Button colorButton={ColorButton.BLUE} onClick={handleSubmit} isFullWidth>
						Сделать ставку
					</Button>
				</div>
			</div>
		</div>
	);
};

export default BidModal;
