import { ReactNode, useState, useRef, useEffect, FC } from "react";
import style from "./dropDownFilter.module.css";

export interface SelectsInterface {
	id: string;
	payLoad: ReactNode | string;
}

interface Props {
	title: string;
	selects: SelectsInterface[];
	onSelect?: (value: ReactNode) => void;
}

const DropDownFilter: FC<Props> = ({ title, selects, onSelect }: Props) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleClick = () => {
		setIsEnabled(!isEnabled);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setIsEnabled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleOutsideClick);
		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	const styleDropDownList = `${style.dropDownList} ${
		isEnabled ? style.show : ""
	}`.trim();

	const styleArrowReverse = isEnabled ? style.reverse : "";

	const handleSelectChange = (id: string, value: ReactNode) => {
		const newSelectedIds = new Set(selectedIds);
		if (newSelectedIds.has(id)) {
			newSelectedIds.delete(id);
		} else {
			newSelectedIds.add(id);
		}
		setSelectedIds(newSelectedIds);
		onSelect?.(value);
	};

	return (
		<div className={style.dropDown} ref={dropdownRef}>
			<div className={style.dropDownMenu} onClick={handleClick}>
				<span className={style.title}>{title}</span>
				<svg
					className={styleArrowReverse}
					width="14"
					height="7"
					viewBox="0 0 15 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.195312 0.475586L7.19531 7.47559L14.1953 0.475586H0.195312Z"
						fill="#6B7A99"
					/>
				</svg>

				<div
					className={styleDropDownList}
					onClick={(e) => e.stopPropagation()}
				>
					{selects.map((select) => (
						<label key={select.id} className={style.checkboxLabel}>
							<input
								type="checkbox"
								checked={selectedIds.has(select.id)}
								onChange={() =>
									handleSelectChange(
										select.id,
										select.payLoad
									)
								}
							/>
							<span className={style.checkboxText}>
								{select.payLoad}
							</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

export default DropDownFilter;
