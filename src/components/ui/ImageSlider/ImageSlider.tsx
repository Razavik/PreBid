import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/pagination";

import style from "./imageSlider.module.css";

interface Props {
	images: string[];
	alt?: string;
}

const ImageSlider: FC<Props> = ({ images, alt = "Product image" }) => {
	if (!images || images.length === 0) {
		return null;
	}

	return (
		<div className={style.sliderContainer}>
			<Swiper
				modules={[Pagination, A11y, Autoplay]}
				pagination={{
					clickable: true,
					el: ".swiper-pagination",
					bulletClass: "swiper-pagination-bullet",
					bulletActiveClass: "swiper-pagination-bullet-active",
				}}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				loop={true}
				className={style.swiper}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className={style.slide}>
						<img
							src={image}
							alt={`${alt} ${index + 1}`}
							className={style.slideImage}
						/>
					</SwiperSlide>
				))}
				<div className="swiper-pagination"></div>
			</Swiper>
		</div>
	);
};

export default ImageSlider;
