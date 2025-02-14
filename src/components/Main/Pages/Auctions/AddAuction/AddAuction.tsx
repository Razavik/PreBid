import { FC, useState } from "react";
import styles from "./AddAuction.module.css";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import MultiDropDown from "@ui/DropDownLists/MultiDropDown/MultiDropDown";
import { auctionsService } from "@services/auctions.service";
import { format } from "date-fns";

interface AddAuctionProps {
	countries: Array<{
		id: number;
		short_name_ru: string;
		name_ru: string;
	}>;
	onSuccess?: () => void;
}

interface FormData {
	name: string;
	type: "open" | "closed";
	countries: number[];
	startDate: Date;
	countdownTime: number;
	endDate: Date;
}

export const AddAuction: FC<AddAuctionProps> = ({ countries, onSuccess }) => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		type: "open",
		countries: [],
		startDate: new Date(),
		countdownTime: 14,
		endDate: new Date(),
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const auctionData = {
				name: formData.name,
				countries: formData.countries,
				date_start: format(formData.startDate, "yyyy-MM-dd HH:mm:ss"),
				is_closed: formData.type === "closed" ? 1 : 0,
				...(formData.type === "closed"
					? { date_final: format(formData.endDate, "yyyy-MM-dd HH:mm:ss") }
					: { bid_time: formData.countdownTime }),
			};

			await auctionsService.createAuction(auctionData);

			// Очищаем форму
			setFormData({
				name: "",
				type: "open",
				countries: [],
				startDate: new Date(),
				countdownTime: 14,
				endDate: new Date(),
			});
			onSuccess?.();
		} catch (error) {
			console.error("Ошибка при создании аукциона:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const countryOptions = countries.map((country) => ({
		id: country.id.toString(),
		payLoad: country.name_ru,
	}));

	const handleCountrySelect = (selectedCountries: string[]) => {
		setFormData((prev) => ({
			...prev,
			countries: selectedCountries.map((id) => parseInt(id)),
		}));
	};

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
						onChange={(e) =>
							setFormData({ ...formData, type: e.target.value as "open" | "closed" })
						}
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

				{formData.type === "open" ? (
					<div className={styles.formGroup}>
						<label>Время отсчета для ставок (сек)</label>
						<input
							type="number"
							min="1"
							value={formData.countdownTime}
							onChange={(e) =>
								setFormData({
									...formData,
									countdownTime: parseInt(e.target.value),
								})
							}
							className={styles.input}
							required
						/>
					</div>
				) : (
					<div className={styles.formGroup}>
						<label>Дата и время завершения аукциона</label>
						<DatePicker
							selected={formData.endDate}
							onChange={(date) =>
								setFormData({ ...formData, endDate: date || new Date() })
							}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							dateFormat="dd.MM.yyyy HH:mm"
							locale={ru}
							className={styles.datePicker}
							placeholderText="Выберите дату и время"
							minDate={formData.startDate}
						/>
					</div>
				)}

				<div className={styles.formGroup}>
					<label>Страны</label>
					<MultiDropDown
						title="Выберите страны"
						selects={countryOptions}
						onSelect={handleCountrySelect}
						styleAddition={dropDownStyles}
					/>
				</div>

				<button type="submit" className={styles.submitButton} disabled={isSubmitting}>
					{isSubmitting ? "Создание..." : "Добавить аукцион"}
				</button>
			</form>
		</div>
	);
};
