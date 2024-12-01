// import { FC } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, A11y } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import style from "./imageSlider.module.css";

// interface Props {
// 	images: string[];
// 	alt?: string;
// }

// const ImageSlider: FC<Props> = ({ images, alt = "Product image" }) => {
// 	if (!images || images.length === 0) {
// 		return null;
// 	}

// 	return (
// 		<div className={style.sliderContainer}>
// 			<Swiper
// 				modules={[Navigation, Pagination, A11y]}
// 				navigation={{
// 					nextEl: ".swiper-button-next",
// 					prevEl: ".swiper-button-prev",
// 				}}
// 				pagination={{
// 					clickable: true,
// 					el: ".swiper-pagination",
// 					bulletClass: "swiper-pagination-bullet",
// 					bulletActiveClass: "swiper-pagination-bullet-active",
// 				}}
// 				loop={true}
// 				className={style.swiper}
// 			>
// 				{images.map((image, index) => (
// 					<SwiperSlide key={index} className={style.slide}>
// 						<img
// 							src={image}
// 							alt={`${alt} ${index + 1}`}
// 							className={style.slideImage}
// 						/>
// 					</SwiperSlide>
// 				))}
// 				<div className="swiper-pagination"></div>
// 				<div className="swiper-button-prev"></div>
// 				<div className="swiper-button-next"></div>
// 			</Swiper>
// 		</div>
// 	);
// };

// export default ImageSlider;
