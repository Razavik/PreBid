import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState, useCallback } from "react";
import type { Swiper as SwiperType } from "swiper";
import arrow from "@assets/img/icons/arrow.svg";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import closeButton from "@assets/img/icons/closeButton.svg";
import styles from "./imageSlider.module.css";
import ImageViewer from "../ImageViewer/ImageViewer";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";

interface Props {
	images: Array<{ id: number; img: string }>;
}

const ImageSlider = ({ images }: Props) => {
	const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
	const [visibleThumbs, setVisibleThumbs] = useState(10);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [currentImageUrl, setCurrentImageUrl] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);

	const showMoreThumbs = () => {
		const remaining = images.length - visibleThumbs;
		const increment = Math.min(remaining, 10);
		setVisibleThumbs(visibleThumbs + increment);
	};

	const hideThumbs = () => {
		setVisibleThumbs(10);
	};

	const visibleImages = images.slice(0, visibleThumbs);
	const hasMoreImages = visibleThumbs < images.length;

	const downloadImages = useCallback(async () => {
		try {
			const zip = new JSZip();
			const folder = zip.folder("images");

			if (!folder) return;

			// Загружаем все изображения
			const imagePromises = images.map(async (image, index) => {
				try {
					const response = await fetch(image.img);
					const blob = await response.blob();
					const extension = image.img.split(".").pop() || "jpg";
					folder.file(`image_${index + 1}.${extension}`, blob);
				} catch (error) {
					console.error(`Ошибка при загрузке изображения ${image.img}:`, error);
				}
			});

			await Promise.all(imagePromises);

			// Создаем и скачиваем архив
			const content = await zip.generateAsync({ type: "blob" });
			saveAs(content, "images.zip");
		} catch (error) {
			console.error("Ошибка при создании архива:", error);
		}
	}, [images]);

	const handleZoomClick = () => {
		setCurrentImageUrl(images[activeIndex].img);
		setIsViewerOpen(true);
	};

	return (
		<>
			<div className={styles.sliderContainer}>
				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={10}
					navigation
					onSwiper={setMainSwiper}
					className={styles.mainSwiper}
					onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				>
					{images.map((image) => (
						<SwiperSlide key={image.id} className={styles.slide}>
							<div className={styles.imageWrapper}>
								<img
									src={image.img}
									alt={`Image ${image.id}`}
									className={styles.slideImage}
								/>
								<button
									className={styles.zoomButton}
									onClick={handleZoomClick}
									title="Увеличить изображение"
								>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M21 21L16.65 16.65"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M11 8V14"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M8 11H14"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div className={styles.thumbsContainer}>
					<div className={styles.thumbsGrid}>
						{visibleImages.map((image) => (
							<div
								key={image.id}
								className={styles.thumbWrapper}
								onClick={() => {
									const index = images.findIndex((img) => img.id === image.id);
									mainSwiper?.slideTo(index);
								}}
							>
								<img
									src={image.img}
									alt={`Thumbnail ${image.id}`}
									className={styles.thumbImage}
								/>
							</div>
						))}
					</div>
					<div className={styles.buttons}>
						{hasMoreImages ? (
							<button onClick={showMoreThumbs} className={styles.showMoreButton}>
								Ещё фото &#40;{Math.min(10, images.length - visibleThumbs)} шт&#41;
								<img src={arrow} alt="arrow" />
							</button>
						) : (
							<button onClick={hideThumbs} className={styles.showMoreButton}>
								Скрыть все фото
								<img src={arrow} alt="arrow" style={{ rotate: "180deg" }} />
							</button>
						)}
						<div className={styles.showAllOrDownload}>
							<button
								className={styles.showAllButton}
								onClick={() => setIsModalOpen(true)}
							>
								Все фото в одном окне
							</button>
							<div className={styles.line}></div>
							<button className={styles.downloadButton} onClick={downloadImages}>
								Скачать фото
							</button>
						</div>
					</div>
				</div>

				{isModalOpen && (
					<div className={styles.modal} onClick={() => setIsModalOpen(false)}>
						<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
							<button
								className={styles.closeButton}
								onClick={() => setIsModalOpen(false)}
							>
								<img src={closeButton} alt="close" />
							</button>
							<div className={styles.modalImages}>
								{images.map((image) => (
									<div key={image.id} className={styles.modalImageWrapper}>
										<img
											src={image.img}
											alt={`Full size ${image.id}`}
											className={styles.modalImage}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
			<ImageViewer
				isOpen={isViewerOpen}
				imageUrl={currentImageUrl}
				onClose={() => setIsViewerOpen(false)}
			/>
		</>
	);
};

export default ImageSlider;
