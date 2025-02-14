import { ReactNode, useState, useRef, useEffect, FC } from "react";
import style from "./dropDownFilter.module.css";
import SelectedFilter from "./SelectedFilter/SelectedFilter";

export interface SelectsInterface {
	id: number;
	payLoad: ReactNode | string;
}

interface Props {
	label: string;
	selects: SelectsInterface[];
	onChange?: (value: SelectsInterface | SelectsInterface[] | null) => void;
	isMulti?: boolean;
	value?: SelectsInterface | SelectsInterface[] | null;
}

const DropDownFilter: FC<Props> = ({ label, selects, onChange, isMulti = false, value }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [selectedItems, setSelectedItems] = useState<SelectsInterface[]>(
		Array.isArray(value) ? value : value ? [value] : []
	);

	useEffect(() => {
		if (value === null) {
			setSelectedItems([]);
		} else if (value) {
			setSelectedItems(Array.isArray(value) ? value : [value]);
		}
	}, [value]);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const handleSelectChange = (select: SelectsInterface) => {
		let newSelectedItems: SelectsInterface[];

		if (isMulti) {
			const itemIndex = selectedItems.findIndex((item) => item.id === select.id);
			if (itemIndex === -1) {
				newSelectedItems = [...selectedItems, select];
			} else {
				newSelectedItems = selectedItems.filter((item) => item.id !== select.id);
			}
		} else {
			newSelectedItems = [select];
			setIsOpen(false);
		}

		setSelectedItems(newSelectedItems);

		if (onChange) {
			onChange(
				isMulti
					? newSelectedItems
					: newSelectedItems.length > 0
					? newSelectedItems[0]
					: null
			);
		}
	};

	const handleRemove = (selectId: number) => {
		const newSelectedItems = selectedItems.filter((item) => item.id !== selectId);
		setSelectedItems(newSelectedItems);

		if (onChange) {
			onChange(isMulti ? newSelectedItems : null);
		}
	};

	return (
		<div className={style.dropDownFilter} ref={dropdownRef}>
			<div className={style.dropDownHeader} onClick={handleClick}>
				<div className={style.text}>
					<span>
						{isMulti
							? label
							: selectedItems[0]?.payLoad
							? selectedItems[0].payLoad
							: label}
					</span>
					{selectedItems &&
						isMulti &&
						selectedItems.map((item) => (
							<SelectedFilter
								key={item.id}
								text={item.payLoad as string}
								onRemove={() => handleRemove(item.id)}
							/>
						))}
				</div>
				<div className={`${style.arrow} ${isOpen ? style.reverse : ""}`}>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 9L12 15L18 9"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
			{isOpen && (
				<div className={`${style.dropDownList} ${isOpen ? style.show : ""}`}>
					{selects.map((select) => (
						<div
							key={select.id}
							className={`${style.dropDownItem} ${
								selectedItems.some((item) => item.id === select.id)
									? style.selected
									: ""
							}`}
							onClick={() => handleSelectChange(select)}
						>
							{select.payLoad}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DropDownFilter;
