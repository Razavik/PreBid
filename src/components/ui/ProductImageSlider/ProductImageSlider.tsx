import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";

//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/navigation";

import style from "./productImageSlider.module.css";

interface Props {
    images: string[];
    alt: string;
}

const ProductImageSlider: FC<Props> = ({ images, alt }) => {
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className={style.sliderContainer}>
            <Swiper
                modules={[Navigation, A11y]}
                navigation={true}
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
            </Swiper>
        </div>
    );
};

export default ProductImageSlider;
