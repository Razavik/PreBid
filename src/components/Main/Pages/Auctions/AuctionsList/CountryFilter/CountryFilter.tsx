import { FC } from "react";
import styles from "./CountryFilter.module.css";

interface CountryFilterProps {
	countries: Array<{
		id: number;
		short_name_ru: string;
		name_ru: string;
	}>;
	selectedCountry: string;
	onCountrySelect: (countryId: string) => void;
}

export const CountryFilter: FC<CountryFilterProps> = ({
	countries,
	selectedCountry,
	onCountrySelect,
}) => {
	return (
		<div className={styles.countryFilter}>
			<button
				className={`${styles.countryButton} ${
					selectedCountry === "ALL" ? styles.active : ""
				}`}
				onClick={() => onCountrySelect("ALL")}
			>
				Все
			</button>
			{countries
				.filter((country) => country.short_name_ru !== "ALL")
				.map((country) => (
					<button
						key={country.id}
						className={`${styles.countryButton} ${
							selectedCountry === country.id.toString() ? styles.active : ""
						}`}
						onClick={() => onCountrySelect(country.id.toString())}
					>
						{country.name_ru}
					</button>
				))}
		</div>
	);
};
