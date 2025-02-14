import { FC, useState } from "react";
import style from "./tabularview.module.css";
import arrowSort from "@assets/img/icons/arrowSort.svg";
import { Transport } from "types/catalog.types";
import Row from "./Row/Row";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

enum SortDirection {
	DEFAULT = "default",
	ASCENDING = "asc",
	DESCENDING = "desc",
}

interface Props {
	products: Transport[];
	isAuthenticated: boolean;
	onSort: (field: string, direction: "asc" | "desc") => void;
	onBid: (currentPrice: number, auctionId: number, transportId: number) => void;
}

const TabularView: FC<Props> = ({ products, isAuthenticated, onSort, onBid }) => {
	const arrowSortAscending = <img src={arrowSort} />;
	const arrowSortDescending = (
		<img
			style={{
				transform: "rotate(180deg)",
			}}
			src={arrowSort}
		/>
	);

	const [sortDirection, setSortDirection] = useState<Record<string, SortDirection>>({});
	const [sortKey, setSortKey] = useState<string | null>(null);

	const userId = useSelector((state: RootState) => state.user.info?.id);

	const getNextSortDirection = (currentDirection: SortDirection) => {
		switch (currentDirection) {
			case SortDirection.DEFAULT:
				return SortDirection.ASCENDING;
			case SortDirection.ASCENDING:
				return SortDirection.DESCENDING;
			case SortDirection.DESCENDING:
			default:
				return SortDirection.DEFAULT;
		}
	};

	const handleSort = (key: string) => {
		const currentDirection = sortDirection[key] || SortDirection.DEFAULT;
		const newDirection = getNextSortDirection(currentDirection);

		setSortDirection((prev) => ({
			...prev,
			[key]: newDirection,
		}));

		setSortKey(key);

		if (newDirection === SortDirection.DEFAULT) {
			onSort("id", "asc");
			return;
		}

		const apiSortKeys: Record<string, string> = {
			id: "id",
			year: "year",
			brand: "brand",
			model: "model",
			volume: "volume",
			odometer: "odometer",
			date: "date",
		};

		const apiKey = apiSortKeys[key] || key;
		const direction = newDirection.toLowerCase() as "asc" | "desc";
		onSort(apiKey, direction);
	};

	const getSortIcon = (key: string) => {
		if (sortKey !== key || sortDirection[key] === SortDirection.DEFAULT) {
			return (
				<div className={style.ascDes}>
					{arrowSortAscending}
					{arrowSortDescending}
				</div>
			);
		}
		if (sortDirection[key] === SortDirection.ASCENDING) {
			return arrowSortAscending;
		}
		if (sortDirection[key] === SortDirection.DESCENDING) {
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
						<th onClick={() => handleSort("year")} style={{ cursor: "pointer" }}>
							<div>
								<span>Год</span>
								{getSortIcon("year")}
							</div>
						</th>
						<th>Марка</th>
						<th>Модель</th>
						<th onClick={() => handleSort("volume")} style={{ cursor: "pointer" }}>
							<div>
								<span>Объем</span>
								{getSortIcon("volume")}
							</div>
						</th>
						<th onClick={() => handleSort("odometer")} style={{ cursor: "pointer" }}>
							<div>
								<span>Одометр</span>
								{getSortIcon("odometer")}
							</div>
						</th>
						<th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
							<div>
								<span>Дата</span>
								{getSortIcon("date")}
							</div>
						</th>
						<th onClick={() => handleSort("bid")} style={{ cursor: "pointer" }}>
							<div>
								<span>Ставка</span>
								{getSortIcon("bid")}
							</div>
						</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<Row
							key={product.general.id}
							product={product}
							isAuthenticated={isAuthenticated}
							userId={userId}
							onBid={onBid}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TabularView;
