import { FC } from "react";
import data from "./products.json";
import TabularView from "./TabularView/TabularView";
import CardView from "./CardView/CardView";

interface Props {
	setCountProducts: (count: number) => void;
	currentView: "tabular" | "card";
}

export interface Data {
	path: string;
	products: {
		lotNumber: number;
		year: number;
		brand: string;
		model: string;
		engineVolume: number;
		mileage: string;
		datetime: {
			date: string;
			time: string;
		};
		bid: number;
		buyNowPrice: number;
		photos: string[];
		disabled: number;
		fuelType: string;
	}[];
}

const Products: FC<Props> = ({ setCountProducts, currentView }) => {
	return (
		<>
			{currentView === "tabular" ? (
				<TabularView data={data} setCountProducts={setCountProducts} />
			) : (
				<CardView data={data} setCountProducts={setCountProducts} />
			)}
		</>
	);
};

export default Products;
