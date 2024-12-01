import { FC, useState } from "react";
import style from "./tabularview.module.css";
import Button, { ColorButton } from "@ui/Button/Button";
import arrowSort from "@assets/img/icons/arrowSort.svg";
import BookmarkButton from "@components/ui/BookmarkButton/BookmarkButton";
import { Data } from "../Products";

enum SortDirection {
	DEFAULT = "default",
	ASCENDING = "asc",
	DESCENDING = "desc",
}

interface Props {
	data: Data;
	setCountProducts: (count: number) => void;
}

const TabularView: FC<Props> = ({ data, setCountProducts }) => {
	setCountProducts(data.products.length);

	const arrowSortAscending = <img src={arrowSort} />;
	const arrowSortDescending = (
		<img
			style={{
				transform: "rotate(180deg)",
			}}
			src={arrowSort}
		/>
	);

	const [sortDirection, setSortDirection] = useState<SortDirection>(
		SortDirection.DEFAULT
	);
	const [sortKey, setSortKey] = useState<string | null>(null);
	const [products, setProducts] = useState<Data["products"]>(data.products);

	const paddingStyle = {
		topBottom: 12,
		leftRight: 32,
	};

	const handleSort = (key: string) => {
		let newDirection: SortDirection;
		if (sortKey !== key) {
			newDirection = SortDirection.ASCENDING;
		} else {
			switch (sortDirection) {
				case SortDirection.DEFAULT:
					newDirection = SortDirection.ASCENDING;
					break;
				case SortDirection.ASCENDING:
					newDirection = SortDirection.DESCENDING;
					break;
				case SortDirection.DESCENDING:
				default:
					newDirection = SortDirection.DEFAULT;
					break;
			}
		}

		setSortDirection(newDirection);
		setSortKey(key);

		if (newDirection === SortDirection.DEFAULT) {
			setProducts(data.products);
			return;
		}

		const sorted = [...products];
		sorted.sort((a: any, b: any) => {
			const valueA = key === "mileage" ? parseInt(a[key]) : a[key];
			const valueB = key === "mileage" ? parseInt(b[key]) : b[key];

			if (newDirection === SortDirection.ASCENDING) {
				return valueA > valueB ? 1 : -1;
			} else {
				return valueA < valueB ? 1 : -1;
			}
		});

		setProducts(sorted);
	};

	const getSortIcon = (key: string) => {
		if (sortKey !== key || sortDirection === SortDirection.DEFAULT) {
			return (
				<div className={style.ascDes}>
					{arrowSortAscending}
					{arrowSortDescending}
				</div>
			);
		}
		if (sortDirection === SortDirection.ASCENDING) {
			return arrowSortAscending;
		}
		if (sortDirection === SortDirection.DESCENDING) {
			return arrowSortDescending;
		}
		return null;
	};

	return (
		<div className={style.tableContainer}>
			<table border={1}>
				<thead>
					<tr>
						<th>Фото</th>
						<th>№ Лота</th>
						<th
							onClick={() => handleSort("year")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<span>Год</span>
								{getSortIcon("year")}
							</div>
						</th>
						<th>Марка</th>
						<th>Модель</th>
						<th
							onClick={() => handleSort("engineVolume")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<span>Объем</span>
								{getSortIcon("engineVolume")}
							</div>
						</th>
						<th
							onClick={() => handleSort("mileage")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<span>Одометр</span>
								{getSortIcon("mileage")}
							</div>
						</th>
						<th
							onClick={() => handleSort("datetime.date")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<span>Дата</span>
								{getSortIcon("datetime.date")}
							</div>
						</th>
						<th
							onClick={() => handleSort("bid")}
							style={{ cursor: "pointer" }}
						>
							<div>
								<span>Ставка</span>
								{getSortIcon("bid")}
							</div>
						</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr key={index}>
							<td className={style.imageCell}>
								<div className={style.imageContainer}>
									<BookmarkButton 
										productId={product.lotNumber}
										onToggle={(id, state) => {
											console.log(`Product ${id} bookmark state: ${state}`);
											// Add your bookmark logic here
										}}
									/>
									<img
										src={data.path + product.photos[0]}
										alt="car"
									/>
								</div>
							</td>
							<td className={style.col2}>
								<a href="#">{product.lotNumber}</a>
							</td>
							<td className={style.col3}>{product.year}</td>
							<td className={style.col4}>{product.brand}</td>
							<td className={style.col5}>{product.model}</td>
							<td className={style.col6}>
								{product.engineVolume}
							</td>
							<td className={style.col7}>{product.mileage}</td>
							<td className={style.col8}>
								<span>{product.datetime.date}</span>
								<span>{product.datetime.time}</span>
							</td>
							<td className={style.col9}>{product.bid}$</td>
							<td className={style.col10}>
								<Button
									colorButton={ColorButton.BLUE}
									paddingStyle={paddingStyle}
									disabled={product.disabled ? true : false}
								>
									Сделать ставку
								</Button>
								<a href="#">
									Купить сейчас за {product.buyNowPrice}$
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TabularView;
