import { FC, useState, useEffect, useRef } from "react";
import styles from "./DropDownRange.module.css";
import Button, { ColorButton } from "@ui/Button/Button";

interface DropDownRangeProps {
	min?: number;
	max?: number;
	onChange?: (range: { min: number; max: number } | null) => void;
	label?: string;
	hasSlider?: boolean;
	unit?: string;
	value?: { min: number; max: number };
}

const DropDownRange: FC<DropDownRangeProps> = ({
	min = 0,
	max = 9999999,
	onChange,
	label,
	hasSlider = false,
	unit,
	value,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [displayRange, setDisplayRange] = useState<{ min: number; max: number }>(
		value || { min, max }
	);
	const [editRange, setEditRange] = useState<{ min: number; max: number }>(value || { min, max });
	const [inputMin, setInputMin] = useState(editRange.min.toString());
	const [inputMax, setInputMax] = useState(editRange.max.toString());
	const [showLabel, setShowLabel] = useState(true);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (value === null || value === undefined) {
			setDisplayRange({ min, max });
			setEditRange({ min, max });
			setInputMin(min.toString());
			setInputMax(max.toString());
			setShowLabel(true);
		} else {
			setDisplayRange(value);
			setEditRange(value);
			setInputMin(value.min.toString());
			setInputMax(value.max.toString());
			setShowLabel(false);
		}
	}, [value, min, max]);

	useEffect(() => {
		if (value) {
			setDisplayRange(value);
			setEditRange(value);
			setInputMin(value.min.toString());
			setInputMax(value.max.toString());
		}
	}, [value]);

	const handleInputChange = (value: string, type: "min" | "max") => {
		const numValue = parseInt(value);
		if (type === "min") {
			setInputMin(value);
			if (!isNaN(numValue)) {
				const newMin = Math.max(min, Math.min(numValue, editRange.max));
				setEditRange({ ...editRange, min: newMin });
			}
		} else {
			setInputMax(value);
			if (!isNaN(numValue)) {
				const newMax = Math.min(max, Math.max(numValue, editRange.min));
				setEditRange({ ...editRange, max: newMax });
			}
		}
	};

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
		const value = parseInt(e.target.value);
		if (type === "min") {
			setEditRange({ ...editRange, min: value });
			setInputMin(value.toString());
		} else {
			setEditRange({ ...editRange, max: value });
			setInputMax(value.toString());
		}
	};

	const handleApply = (e: React.MouseEvent) => {
		e.stopPropagation();
		setDisplayRange(editRange);
		onChange?.(editRange);
		setShowLabel(false);
		setIsOpen(false);
	};

	const handleReset = (e: React.MouseEvent) => {
		e.stopPropagation();
		const defaultRange = { min, max };
		setDisplayRange(defaultRange);
		setEditRange(defaultRange);
		setInputMin(min.toString());
		setInputMax(max.toString());
		onChange?.(null);
		setShowLabel(true);
		setIsOpen(false);
	};

	const toggleDropdown = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isOpen) {
			setEditRange(displayRange);
			setInputMin(displayRange.min.toString());
			setInputMax(displayRange.max.toString());
		}
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
				setEditRange(displayRange);
				setInputMin(displayRange.min.toString());
				setInputMax(displayRange.max.toString());
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [displayRange]);

	return (
		<div className={styles.container} ref={containerRef} onClick={toggleDropdown}>
			<div className={styles.labelContainer}>
				{showLabel ? (
					<label className={styles.label}>{label}</label>
				) : (
					<div className={styles.label}>
						{displayRange.min} - {displayRange.max} {unit}
					</div>
				)}
				<div className={styles.labelControls}>
					<button className={styles.resetButton} onClick={handleReset}>
						Сбросить
					</button>
					<div className={styles.minus}></div>
				</div>
			</div>

			<div className={`${styles.dropdown} ${isOpen ? styles.show : ""}`}>
				<div className={styles.inputs} onClick={(e) => e.stopPropagation()}>
					<input
						type="text"
						value={inputMin}
						onChange={(e) => handleInputChange(e.target.value, "min")}
						placeholder={min.toString()}
					/>
					<div className={styles.minusRange}></div>
					<input
						type="text"
						value={inputMax}
						onChange={(e) => handleInputChange(e.target.value, "max")}
						placeholder={max.toString()}
					/>
				</div>
				{hasSlider && (
					<div className={styles.sliderContainer} onClick={(e) => e.stopPropagation()}>
						<div className={styles.values}>
							<p>
								<span>{editRange.min}</span> {unit}
							</p>
							<p>
								<span>{editRange.max}</span> {unit}
							</p>
						</div>
						<div className={styles.rangeSlider}>
							<div
								className={styles.sliderTrack}
								style={{
									background: `linear-gradient(
										to right,
										#d3d8e6 0%,
										#d3d8e6 ${((editRange.min - min) / (max - min)) * 100}%,
										#3498ff ${((editRange.min - min) / (max - min)) * 100}%,
										#3498ff ${((editRange.max - min) / (max - min)) * 100}%,
										#d3d8e6 ${((editRange.max - min) / (max - min)) * 100}%,
										#d3d8e6 100%
									)`,
								}}
							></div>
							<input
								type="range"
								min={min}
								max={max}
								value={editRange.min}
								onChange={(e) => handleSliderChange(e, "min")}
								className={`${styles.slider} ${styles.sliderLeft}`}
							/>
							<input
								type="range"
								min={min}
								max={max}
								value={editRange.max}
								onChange={(e) => handleSliderChange(e, "max")}
								className={`${styles.slider} ${styles.sliderRight}`}
							/>
						</div>
					</div>
				)}
				<Button colorButton={ColorButton.BLUE} onClick={handleApply} isFullWidth>
					Показать результаты
				</Button>
			</div>
		</div>
	);
};

export default DropDownRange;
