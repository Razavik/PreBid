import React from "react";
import { Transport } from "types/catalog.types";
import styles from "../characteristics.module.css";
import copyIcon from "@assets/img/icons/copyButton.png";
import { useToastStore } from "@store/toastStore";

interface MainInfoProps {
	transport: Transport;
}

const MainInfo: React.FC<MainInfoProps> = ({ transport }) => {
	const showToast = useToastStore(
		(state: { showToast: (message: string, type: "success" | "error" | "info") => void }) =>
			state.showToast
	);

	const handleCopyVin = async () => {
		try {
			await navigator.clipboard.writeText(transport.general.vin);
			showToast("VIN номер скопирован!", "success");
		} catch (err) {
			console.error("Ошибка при копировании VIN:", err);
			showToast("Ошибка при копировании VIN", "error");
		}
	};

	return (
		<div className={styles.infoCard}>
			<h2>Основные характеристики</h2>
			<div className={styles.infoGrid}>
				<div className={styles.infoItem}>
					<span className={styles.label}>ЛОТ</span>
					<span className={styles.value}>{transport.general.id}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>VIN</span>
					<div className={styles.vinContainer}>
						<span
							className={`${styles.value} ${styles.vinValue}`}
							onClick={handleCopyVin}
							title="Нажмите, чтобы скопировать"
						>
							{transport.general.vin}
						</span>
						<button
							className={styles.copyButton}
							onClick={handleCopyVin}
							title="Скопировать VIN"
						>
							<img src={copyIcon} alt="Копировать" />
						</button>
					</div>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Объем ДВС</span>
					<span className={styles.value}>{transport.characteristic.volume}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Тип топлива</span>
					<span className={styles.value}>{transport.characteristic.fuel.name}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Трансмиссия</span>
					<span className={styles.value}>
						{transport.characteristic.transmission.name}
					</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Привод</span>
					<span className={styles.value}>{transport.characteristic.drive.name}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Тип кузова</span>
					<span className={styles.value}>{transport.characteristic.body_type}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Цвет кузова</span>
					<span className={styles.value}>{transport.characteristic.color.name}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Пробег</span>
					<span className={styles.value}>{transport.characteristic.odometer} km</span>
				</div>
			</div>
		</div>
	);
};

export default MainInfo;
