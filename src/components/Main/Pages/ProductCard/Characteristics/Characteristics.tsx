import React from "react";
import { Transport } from "types/catalog.types";
import styles from "./characteristics.module.css";
import MainInfo from "./MainInfo/MainInfo";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import { useState, useEffect } from "react";

interface CharacteristicsProps {
	transport: Transport | null;
}

export const Characteristics: React.FC<CharacteristicsProps> = ({ transport }) => {
	const [isExpanded, setIsExpanded] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth <= 768;
			setIsMobile(mobile);

			if (!mobile) {
				setIsExpanded(true);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (!transport) return null;

	return (
		<div className={styles.characteristics}>
			<button onClick={() => setIsExpanded(!isExpanded)} className={styles.button}>
				{isExpanded ? "Скрыть характеристики" : "Смотреть характеристики"}
				<svg
					width="16px"
					height="16px"
					viewBox="0 0 16 16"
					fill="currentColor"
					color="#0065b0"
					style={{ rotate: isExpanded ? "0deg" : "180deg" }}
				>
					<path d="M10.293 9.707L8 7.415 5.707 9.707a.999.999 0 11-1.414-1.414l3-3a.99.99 0 01.531-.277l.117-.014h.118a.997.997 0 01.648.291l3 3a.999.999 0 11-1.414 1.414z" />
				</svg>
			</button>
			{(!isMobile || isExpanded) && (
				<>
					<MainInfo transport={transport} />
					<AdditionalInfo transport={transport} />
				</>
			)}
		</div>
	);
};
