import { ReactNode, useState, useRef, useEffect, FC } from "react";
import style from "./dropDownItem.module.css";

export interface SelectsInterface {
	id: string;
	payLoad: ReactNode | string;
}

interface Props {
	title: string;
	selects: SelectsInterface[];
	styleAddition?: object;
	onSelect?: (value: ReactNode) => void;
}

const DropDownItem: FC<Props> = ({
	title,
	selects,
	styleAddition,
	onSelect,
}: Props) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
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

	const handleSelectChange = (id: string, value: ReactNode) => {
		if (selectedId === id) {
			setSelectedId(null);
			onSelect?.(title);
		} else {
			setSelectedId(id);
			onSelect?.(value);
		}
		setIsEnabled(false);
	};

	return (
		<div className={style.dropDown} ref={dropdownRef}>
			<div
				className={style.dropDownMenu}
				onClick={handleClick}
				style={styleAddition}
			>
				<span className={style.title}>
					{selectedId
						? selects.find((s) => s.id === selectedId)?.payLoad
						: title}
				</span>
				<svg
					className={styleArrowReverse}
					width="10"
					height="5"
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
			</div>
			<ul ref={listRef} className={styleDropDownList}>
				{selects.map((select) => (
					<li
						key={select.id}
						className={`${style.dropDownItem} ${
							selectedId === select.id ? style.selected : ""
						}`}
						onClick={() =>
							handleSelectChange(select.id, select.payLoad)
						}
					>
						{select.payLoad}
					</li>
				))}
			</ul>
		</div>
	);
};

export default DropDownItem;
