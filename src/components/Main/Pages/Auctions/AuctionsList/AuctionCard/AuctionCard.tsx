import { FC, useState, useEffect } from "react";
import { format, intervalToDuration } from "date-fns";
import { Auction } from "@services/auctions.service";
import styles from "./AuctionCard.module.css";
import Button, { ColorButton } from "@components/ui/Button/Button";

interface AuctionCardProps {
	auction: Auction;
}

export const AuctionCard: FC<AuctionCardProps> = ({ auction }) => {
	const [timeLeft, setTimeLeft] = useState<string>("");
	const isRunningNow = auction.status.code === "start";

	useEffect(() => {
		const updateTimeLeft = () => {
			const now = new Date();
			const startDate = new Date(auction.date_start);

			if (now > startDate) {
				setTimeLeft("Аукцион начался");
				return;
			}

			const duration = intervalToDuration({
				start: now,
				end: startDate,
			});

			const { days, hours, minutes, seconds } = duration;

			const formatNumber = (num: number | undefined) => {
				return num !== undefined ? num.toString().padStart(2, "0") : "00";
			};

			const parts = [];

			// Добавляем дни, только если они есть
			if (days && days > 0) {
				parts.push(`${formatNumber(days)} д`);
			}

			// Добавляем часы, если они есть
			if (hours && hours > 0) {
				parts.push(`${formatNumber(hours)} ч`);
				// Если есть часы, добавляем минуты в любом случае
				parts.push(`${formatNumber(minutes)} м`);
			} else if (minutes && minutes > 0) {
				// Если часов нет, но есть минуты, добавляем только минуты
				parts.push(`${formatNumber(minutes)} м`);
			}

			// Секунды добавляем всегда
			parts.push(`${formatNumber(seconds)} с`);

			setTimeLeft(parts.join(" "));
		};

		// Обновляем время сразу при монтировании
		updateTimeLeft();

		// Обновляем каждую секунду
		const interval = setInterval(updateTimeLeft, 1000);

		// Очищаем интервал при размонтировании
		return () => clearInterval(interval);
	}, [auction.date_start]);

	return (
		<div className={styles.card}>
			<div className={styles.mainInfo}>
				<div className={styles.countries}>
					{auction.countries.map((country) => (
						<span key={country.id} className={styles.countryTag}>
							{country.short_name_ru}
						</span>
					))}
				</div>
				<div className={styles.titleRow}>
					<h3 className={styles.title}>{auction.name}</h3>
					<div className={styles.id}>ID аукциона {auction.id}</div>
					<div className={styles.type}>{auction.is_closed ? "Закрытый" : "Открытый"}</div>
				</div>

				<div className={styles.stats}>
					<div className={styles.stat}>
						<span className={styles.label}>Количество транспортных средств</span>
						<span className={styles.value}>{auction.transports_count}</span>
					</div>
				</div>

				{isRunningNow ? (
					<div className={styles.timeInfo}>
						<div className={styles.runningNow}>
							<span className={styles.label}>Проходит сейчас</span>
						</div>
					</div>
				) : (
					<div className={styles.timeInfo}>
						<div className={styles.startTime}>
							<span className={styles.label}>Дата начала</span>
							<span className={styles.value}>
								{format(new Date(auction.date_start), "yyyy-MM-dd HH:mm:ss")}
							</span>
						</div>
						<div className={styles.timeLeft}>
							<span className={styles.label}>Оставшееся время</span>
							<span className={styles.value}>{timeLeft}</span>
						</div>
					</div>
				)}
			</div>

			<Button colorButton={ColorButton.BLUE}>Смотреть подробнее</Button>
		</div>
	);
};
