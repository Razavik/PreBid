import { FC, useState } from "react";
import styles from "./AddAuction.module.css";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale/ru";

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
		country: "",
		startDate: new Date(),
		countdownTime: 0,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Добавить логику отправки данных
		console.log("Form data:", formData);
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
					<label>Страна</label>
					<select
						value={formData.country}
						onChange={(e) => setFormData({ ...formData, country: e.target.value })}
						className={styles.select}
						required
					>
						<option value="">Выберите страну</option>
						{countries.map((country) => (
							<option key={country.id} value={country.short_name_ru}>
								{country.name_ru}
							</option>
						))}
					</select>
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
