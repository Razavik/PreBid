import React from "react";
import styles from "./imageviewer.module.css";
import closeButton from "@assets/img/icons/closeButton.svg";

interface ImageViewerProps {
	isOpen: boolean;
	imageUrl: string;
	onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ isOpen, imageUrl, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.imageContainer}>
				<button className={styles.closeButton} onClick={onClose}>
					<img src={closeButton} alt="Закрыть" />
				</button>
				<img src={imageUrl} alt="Увеличенное изображение" className={styles.image} />
			</div>
		</div>
	);
};

export default ImageViewer;
