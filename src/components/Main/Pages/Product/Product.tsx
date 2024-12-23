import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "@context/ProductContext";
import ProductImageSlider from "@components/ui/ProductImageSlider/ProductImageSlider";
import style from "./product.module.css";
import Container from "@components/ui/Container/Container";
import Button, { ColorButton } from "@components/ui/Button/Button";

const Product = () => {
	const { lotNumber } = useParams<{ lotNumber: string }>();
	const navigate = useNavigate();
	const { getProductByLotNumber, currentProduct, imagePath } = useProducts();

	useEffect(() => {
		if (lotNumber) {
			const product = getProductByLotNumber(Number(lotNumber));
			if (!product) {
				navigate("/");
			}
		}
	}, [lotNumber, getProductByLotNumber, navigate]);

	if (!currentProduct) {
		return <div>Загрузка...</div>;
	}
	return (
		<Container>
			<div className="button">
				<Button colorButton={ColorButton.BLUE} onClick={() => navigate(-1)}>
					Назад
				</Button>
			</div>
			<h1>
				{currentProduct.brand} {currentProduct.model}
			</h1>
			<div className={style.product}>
				<div className={style.photos}>
					<ProductImageSlider
						images={currentProduct.photos.map((photo) => `${imagePath}${photo}`)}
						alt={`${currentProduct.brand} ${currentProduct.model}`}
					/>
				</div>
				<div className={style.description}>
					<div className={style.productInfo}>
						<p>Номер лота: {currentProduct.lotNumber}</p>
						<p>Год выпуска: {currentProduct.year}</p>
						<p>Пробег: {currentProduct.mileage}</p>
						<p>Объем двигателя: {currentProduct.engineVolume}</p>
						<p>Текущая ставка: {currentProduct.bid}</p>
						<p>Цена выкупа: {currentProduct.buyNowPrice}</p>
						<p>
							Дата аукциона: {currentProduct.datetime.date}{" "}
							{currentProduct.datetime.time}
						</p>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Product;
