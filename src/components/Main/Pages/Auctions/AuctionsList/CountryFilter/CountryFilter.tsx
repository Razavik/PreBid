import { FC } from "react";
import styles from "./CountryFilter.module.css";

interface CountryFilterProps {
    countries: Array<{
        id: number;
        short_name_ru: string;
        name_ru: string;
    }>;
    selectedCountry: string;
    onCountrySelect: (country: string) => void;
}

export const CountryFilter: FC<CountryFilterProps> = ({
    countries,
    selectedCountry,
    onCountrySelect
}) => {
    return (
        <div className={styles.countryFilter}>
            {countries.map((country) => (
                <button
                    key={country.id}
                    className={`${styles.countryButton} ${
                        selectedCountry === country.short_name_ru ? styles.active : ""
                    }`}
                    onClick={() => onCountrySelect(country.short_name_ru)}
                >
                    {country.name_ru}
                </button>
            ))}
        </div>
    );
};
