import { ReactNode, useState, useRef, useEffect, FC } from "react";
import style from "./MultiDropDown.module.css";

export interface SelectsInterface {
	id: string;
	payLoad: ReactNode | string;
}

interface Props {
	title: string;
	selects: SelectsInterface[];
	styleAddition?: object;
	onSelect?: (values: string[]) => void;
}

const MultiDropDown: FC<Props> = ({
	title,
	selects,
	styleAddition,
	onSelect,
}: Props) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

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

	const handleWheel = (event: WheelEvent) => {
		event.preventDefault();
		if (listRef.current) {
			listRef.current.scrollTop += event.deltaY;
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleOutsideClick);
		const listElement = listRef.current;

		if (listElement) {
			listElement.addEventListener("wheel", handleWheel, {
				passive: false,
			});
		}

		return () => {
			window.removeEventListener("click", handleOutsideClick);
			if (listElement) {
				listElement.removeEventListener("wheel", handleWheel);
			}
		};
	}, [isEnabled]);

	const styleDropDownList = `${style.dropDownList} ${
		isEnabled ? style.show : ""
	}`.trim();

	const styleArrowReverse = isEnabled ? style.reverse : "";

	const handleSelectChange = (event: React.MouseEvent, id: string) => {
		event.stopPropagation();
		let newSelectedIds;
		if (selectedIds.includes(id)) {
			newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
		} else {
			newSelectedIds = [...selectedIds, id];
		}
		setSelectedIds(newSelectedIds);
		onSelect?.(newSelectedIds);
	};

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
		event.stopPropagation();
		let newSelectedIds;
		if (event.target.checked) {
			newSelectedIds = [...selectedIds, id];
		} else {
			newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
		}
		setSelectedIds(newSelectedIds);
		onSelect?.(newSelectedIds);
	};

	const getSelectedItemsText = () => {
		if (selectedIds.length === 0) return title;
		
		const selectedItems = selects
			.filter((item) => selectedIds.includes(item.id))
			.map((item) => item.payLoad)
			.join(", ");
		
		return selectedItems;
	};

	return (
		<div className={style.dropDown} ref={dropdownRef}>
			<div
				className={style.dropDownMenu}
				onClick={handleClick}
				style={styleAddition}
			>
				<div className={style.selectedItems}>
					{getSelectedItemsText()}
				</div>
				{selectedIds.length > 0 && (
					<div className={style.counter}>{selectedIds.length}</div>
				)}
				<svg
					className={styleArrowReverse}
					width="10"
					height="5"
					viewBox="0 0 15 8"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.5 1L7.5 7L13.5 1"
						stroke="#666"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<ul className={styleDropDownList} ref={listRef}>
				{selects.map(({ id, payLoad }) => (
					<li
						key={id}
						className={style.dropDownItem}
						onClick={(e) => handleSelectChange(e, id)}
					>
						<label className={style.checkboxLabel} onClick={(e) => e.stopPropagation()}>
							<input
								type="checkbox"
								checked={selectedIds.includes(id)}
								onChange={(e) => handleCheckboxChange(e, id)}
								className={style.checkbox}
							/>
							<span className={style.checkmark}></span>
							{payLoad}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MultiDropDown;
