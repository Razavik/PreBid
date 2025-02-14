import React from "react";
import styles from "./deliveryinfo.module.css";
import { Delivery } from "types/catalog.types";

interface DeliveryInfoProps {
	delivery: Delivery;
	dateStart: string;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ delivery, dateStart }) => {
	function formatDateDelivery(dateDelivery: string) {
		const date = new Date(dateDelivery);

		return `${date.toLocaleDateString()}`;
	}

	function formatDateTimeStart(dateStart: string) {
		const dateTime = new Date(dateStart);

		const date = dateTime.toLocaleDateString();
		const time = dateTime.toLocaleTimeString();

		return `${date} в ${time}`;
	}

	return (
		<div className={styles.deliveryInfo}>
			<div className={styles.row}>
				<span className={styles.label}>Статус</span>
				<span className={styles.value}>Порт Америки</span>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>Порт назначения</span>
				<span className={styles.value}>{delivery.port.name}</span>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>Место назначения</span>
				<span className={styles.value}></span>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>Ориентировочная дата доставки</span>
				<span className={styles.value}>{formatDateDelivery(delivery.date_delivery)}</span>
			</div>
			<div className={styles.row}>
				<span className={styles.label}>Дата и время начала аукциона:</span>
				<span className={styles.value}>{formatDateTimeStart(dateStart)}</span>
			</div>
		</div>
	);
};
