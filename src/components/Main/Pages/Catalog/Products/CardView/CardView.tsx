import { FC } from "react";
import { Data } from "../Products";
import style from "./cardview.module.css";
import Button, { ColorButton } from "@components/ui/Button/Button";
import BookmarkButton from "@components/ui/BookmarkButton/BookmarkButton";
// import ImageSlider from "@components/ui/ImageSlider/ImageSlider";

interface Props {
	data: Data;
	setCountProducts: (count: number) => void;
}

const CardView: FC<Props> = ({ data, setCountProducts }) => {
	setCountProducts(data.products.length);

	const paddingStyle = {
		topBottom: 12,
		leftRight: 32,
	};

	return (
		<div className={style.cardView}>
			{data.products.map((product, index) => (
				<div key={"card-" + index} className={style.card}>
					<div className={style.photoContainer}>
						<BookmarkButton
							productId={product.lotNumber}
							onToggle={(id, state) => {
								console.log(
									`Product ${id} bookmark state: ${state}`
								);
							}}
						/>
						<img src={data.path + product.photos[0]} alt="car" />
						{/* <ImageSlider
							images={product.photos.map(
								(photo) => `${data.path}${photo}`
							)}
							alt={`${product.brand} ${product.model}`}
						/> */}
					</div>

					<div className={style.details}>
						<h3>
							{product.year} {product.brand} {product.model}
						</h3>
						<p>
							<span>Номер лота</span>
							<a href="#">{product.lotNumber}</a>
						</p>
						<p>
							<span>Дата аукциона</span>
							<span>{product.datetime.date}</span>
						</p>
						<p>
							<span>Объем двигателя</span>
							<span>{product.engineVolume}</span>
						</p>
						<p>
							<span>Тип топлива</span>
							<span>{product.fuelType}</span>
						</p>
						<p>
							<span>Одометр</span> <span>{product.mileage}</span>
						</p>
						<div>
							<p>
								<span>Текущая ставка</span>
								<span>${product.buyNowPrice}</span>
							</p>
							<Button
								colorButton={ColorButton.BLUE}
								paddingStyle={paddingStyle}
								disabled={Boolean(product.disabled)}
							>
								Сделать ставку
							</Button>
						</div>
						<a href="#">Купить сейчас за {product.buyNowPrice}$</a>
					</div>
				</div>
			))}
		</div>
	);
};

export default CardView;
