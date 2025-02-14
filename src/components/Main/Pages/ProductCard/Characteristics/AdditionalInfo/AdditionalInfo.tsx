import React from "react";
import { Transport } from "types/catalog.types";
import styles from "../characteristics.module.css";

interface AdditionalInfoProps {
	transport: Transport;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ transport }) => {
	return (
		<div className={styles.infoCard}>
			<h2>Дополнительные сведения</h2>
			<div className={styles.infoGrid}>
				<div className={styles.infoItem}>
					<span className={styles.label}>Тип повреждения</span>
					<span className={styles.value}>{transport.characteristic.damage_text}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Тип документа</span>
					<span className={styles.value}>{transport.general.docFee.title}</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Ключи</span>
					<div className={styles.keyWrapper}>
						{transport.image_key && (
							<div className={styles.keyImage}>
								<img src={transport.image_key} alt="Ключ" />
							</div>
						)}
						<span className={styles.value}>{transport.characteristic.keys}</span>
					</div>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.label}>Состояние</span>
					<span className={styles.value}>{transport.characteristic.highlight.name}</span>
				</div>
			</div>
		</div>
	);
};

export default AdditionalInfo;
