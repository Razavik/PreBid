import { FC } from "react";
import style from "./toolbar.module.css";
import Button, { ColorButton } from "@ui/Button/Button";
import filterIcon from "@assets/img/icons/filterIcon.svg";
import SelectedFilter from "@ui/DropDownLists/DropDownFilter/SelectedFilter/SelectedFilter";
import { TransportFilters } from "../Filter/Filter";
import { pluralize } from "@utils/pluralize";

interface Props {
	countProducts: number;
	currentView: "tabular" | "card";
	setView: (view: "tabular" | "card") => void;
	onFilterClick: () => void;
	selectedFilters: Record<string, any>;
	filters: TransportFilters | null;
	onFilterRemove: (filterKey: string, value: number) => void;
	onResetFilters: () => void;
}

const Toolbar: FC<Props> = ({
	countProducts,
	currentView,
	setView,
	onFilterClick,
	selectedFilters,
	filters,
	onFilterRemove,
	onResetFilters,
}) => {
	const renderSelectedFilters = () => {
		if (!filters) return null;

		return Object.entries(selectedFilters).map(([key, value]) => {
			if (!value) return null;

			// Обработка диапазонов (год и одометр)
			if (typeof value === "object" && !Array.isArray(value) && value.min !== undefined) {
				if (value.min === 0 && value.max === 0) return null;
				return (
					<SelectedFilter
						key={key}
						text={`${value.min} - ${value.max} ${key === "odometer" ? "км" : "год"}`}
						onRemove={() => onFilterRemove(key, 0)}
					/>
				);
			}

			// Обработка массивов (множественный выбор)
			if (Array.isArray(value)) {
				return value.map((val) => {
					const filterOption = (filters[key as keyof TransportFilters] as any[]).find(
						(option) => option.id === val
					);
					if (!filterOption) return null;

					return (
						<SelectedFilter
							key={`${key}-${val}`}
							text={`${filterOption.payLoad}`}
							onRemove={() => onFilterRemove(key, val)}
						/>
					);
				});
			}

			// Обработка одиночных значений
			const filterOption = (filters[key as keyof TransportFilters] as any[]).find(
				(option) => option.id === value
			);
			if (!filterOption) return null;

			return (
				<SelectedFilter
					key={key}
					text={`${filterOption.payLoad}`}
					onRemove={() => onFilterRemove(key, value)}
				/>
			);
		});
	};

	const hasFilters = Object.values(selectedFilters).some((value) => value !== null);

	return (
		<div className={style.toolbar}>
			<div className={style.toolbarTop}>
				<div className={style.leftSide}>
					<div className={style.mobileButton}>
						<Button
							colorButton={ColorButton.BLUE}
							onClick={() => onFilterClick()}
							style={{ fontWeight: "700", padding: "10px 16px" }}
						>
							<span>Фильтры</span>
							<img src={filterIcon} alt="filter" />
						</Button>
					</div>
					<div className={style.tools}>
						<span>Найдено</span>
						<span>
							{countProducts} {pluralize(countProducts, ["результат", "результата", "результатов"])}
						</span>
						<div className={style.viewButtons}>
							<button
								className={`${style.button} ${
									currentView === "tabular" ? style.active : ""
								}`}
								onClick={() => setView("tabular")}
							>
								<svg
									width="25"
									height="25"
									viewBox="0 0 25 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M9.82689 10.4956H14.5637V21.4756H9.82689V10.4956ZM16.4585 21.4756H19.3006C20.3427 21.4756 21.1953 20.5756 21.1953 19.4756V10.4756H16.4585V21.4756ZM19.3006 3.47559H5.09005C4.04794 3.47559 3.19531 4.37559 3.19531 5.47559V8.47559H21.1953V5.47559C21.1953 4.37559 20.3427 3.47559 19.3006 3.47559ZM3.19531 19.4756C3.19531 20.5756 4.04794 21.4756 5.09005 21.4756H7.93215V10.4756H3.19531V19.4756Z" />
								</svg>
							</button>
							<button
								className={`${style.button} ${
									currentView === "card" ? style.active : ""
								}`}
								onClick={() => setView("card")}
							>
								<svg
									width="25"
									height="25"
									viewBox="0 0 25 25"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3.19531 6.54377C3.19531 5.73004 3.51857 4.94963 4.09396 4.37424C4.66936 3.79884 5.44976 3.47559 6.26349 3.47559H8.51349V8.79377H3.19531V6.54377ZM3.19531 10.021V14.9301H8.51349V10.021H3.19531ZM3.19531 16.1574V18.4074C3.19531 19.2211 3.51857 20.0015 4.09396 20.5769C4.66936 21.1523 5.44976 21.4756 6.26349 21.4756H8.51349V16.1574H3.19531ZM9.74077 21.4756H14.6499V16.1574H9.74077V21.4756ZM15.8771 21.4756H18.1271C18.9409 21.4756 19.7213 21.1523 20.2967 20.5769C20.8721 20.0015 21.1953 19.2211 21.1953 18.4074V16.1574H15.8771V21.4756ZM21.1953 14.9301V10.021H15.8771V14.9301H21.1953ZM21.1953 8.79377V6.54377C21.1953 5.73004 20.8721 4.94963 20.2967 4.37424C19.7213 3.79884 18.9409 3.47559 18.1271 3.47559H15.8771V8.79377H21.1953ZM14.6499 3.47559H9.74077V8.79377H14.6499V3.47559ZM14.6499 10.021V14.9301H9.74077V10.021H14.6499Z" />
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className={style.rightSide}>
					<div className={style.selectedFilters}>
						{renderSelectedFilters()}{" "}
						{hasFilters && (
							<button onClick={onResetFilters} className={style.resetButton}>
								Сбросить все
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Toolbar;
