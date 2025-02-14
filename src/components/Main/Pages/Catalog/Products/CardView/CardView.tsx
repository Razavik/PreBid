import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import { Transport } from "types/catalog.types";
import style from "./cardview.module.css";
import Card from "./Card/Card";

interface Props {
	products: Transport[];
	isAuthenticated: boolean;
	onBid: (currentPrice: number, auctionId: number, transportId: number) => void;
}

const CardView: FC<Props> = ({ products, isAuthenticated, onBid }) => {
	const [userId, setUserId] = useState<number | null>(null);
	const user = useSelector((state: RootState) => state.user.info);

	useEffect(() => {
		const fetchId = async () => {
			try {
				if (isAuthenticated && user) {
					setUserId(user.id);
				}
			} catch (error) {
				console.error("Ошибка при получении email:", error);
			}
		};
		fetchId();
	}, [isAuthenticated, user]);

	return (
		<div className={style.cardView}>
			{products.map((product) => (
				<Card
					key={product.general.id}
					product={product}
					isAuthenticated={isAuthenticated}
					userId={userId}
					onBid={onBid}
				/>
			))}
		</div>
	);
};

export default CardView;
