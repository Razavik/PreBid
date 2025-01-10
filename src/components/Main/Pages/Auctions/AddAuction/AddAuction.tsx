import { FC, useState } from "react";
import styles from "./AddAuction.module.css";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import MultiDropDown from "@ui/DropDownLists/MultiDropDown/MultiDropDown";

interface AddAuctionProps {
	countries: Array<{
		id: number;
		short_name_ru: string;
		name_ru: string;
	}>;
}

export const AddAuction: FC<AddAuctionProps> = ({ countries }) => {
	const [formData, setFormData] = useState({
		name: "",
		type: "open",
		countries: [] as number[],
		startDate: new Date(),
		countdownTime: 0,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Добавить логику отправки данных
		console.log("Form data:", formData);
	};

	const countryOptions = countries.map((country) => ({
		id: country.id.toString(),
		payLoad: country.name_ru,
	}));

	const handleCountrySelect = (selectedCountries: string[]) => {
		setFormData((prev) => ({
			...prev,
			countries: selectedCountries.map(id => parseInt(id)),
		}));
	};

	// Стили для компонента MultiDropDown
	const dropDownStyles = {
		padding: "12px",
		border: "1px solid #e0e0e0",
		borderRadius: "4px",
		width: "100%",
		justifyContent: "space-between",
	};

	return (
		<div className={styles.addAuctionContainer}>
			<h2 className={styles.title}>Добавить аукцион</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label>Название аукциона</label>
					<input
						type="text"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						placeholder="Название"
						className={styles.input}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Тип аукциона</label>
					<select
						value={formData.type}
						onChange={(e) => setFormData({ ...formData, type: e.target.value })}
						className={styles.select}
					>
						<option value="open">Открытый</option>
						<option value="closed">Закрытый</option>
					</select>
				</div>

				<div className={styles.formGroup}>
					<label>Дата и время начала аукциона</label>
					<DatePicker
						selected={formData.startDate}
						onChange={(date) =>
							setFormData({ ...formData, startDate: date || new Date() })
						}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						dateFormat="dd.MM.yyyy HH:mm"
						locale={ru}
						className={styles.datePicker}
						placeholderText="Выберите дату и время"
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Страны</label>
					<MultiDropDown
						title="Выберите страны"
						selects={countryOptions}
						onSelect={handleCountrySelect}
						styleAddition={dropDownStyles}
					/>
				</div>

				<div className={styles.formGroup}>
					<label>Время отсчета для ставок (сек)</label>
					<input
						type="number"
						min="0"
						value={formData.countdownTime}
						onChange={(e) =>
							setFormData({ ...formData, countdownTime: parseInt(e.target.value) })
						}
						className={styles.input}
						required
					/>
				</div>

				<button type="submit" className={styles.submitButton}>
					Добавить аукцион
				</button>
			</form>
		</div>
	);
};
