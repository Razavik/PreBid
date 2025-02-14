import { FC } from "react";
import styles from "./loadingOverlay.module.css";
import logo from "@assets/img/icons/logo.svg";

export const LoadingOverlay: FC = () => {
	return (
		<div className={styles.overlay}>
			<img src={logo} alt="logo" />
			<div className={styles.progressContainer}>
				<div className={styles.progressBar} />
			</div>
		</div>
	);
};
