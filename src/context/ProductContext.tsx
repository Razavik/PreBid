import {
	useContext,
	useState,
	createContext,
	FC,
	ReactNode,
	useEffect,
} from "react";
import productsData from "@components/Main/Pages/Catalog/Products/products.json";

interface Product {
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
}

interface ProductContextType {
	products: Product[];
	currentProduct: Product | undefined;
	getProductByLotNumber: (lotNumber: number) => Product | undefined;
	imagePath: string;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [currentProduct, setCurrentProduct] = useState<Product>();
	const imagePath = productsData.path;

	useEffect(() => {
		setProducts(productsData.products);
	});

	const getProductByLotNumber = (lotNumber: number) => {
		const product = products.find(
			(product) => product.lotNumber === lotNumber
		);

		if (product) setCurrentProduct(product);

		return product;
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				currentProduct,
				getProductByLotNumber,
				imagePath,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProducts = () => {
	const context = useContext(ProductContext);

	if (context === undefined) {
		throw new Error(
			"useProducts должен использоваться внутри ProductProvider"
		);
	}

	return context;
};

export default ProductProvider;
