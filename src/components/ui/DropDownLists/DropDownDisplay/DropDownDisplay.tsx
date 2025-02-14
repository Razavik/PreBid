import { FC, ReactNode, useState, useRef, useEffect } from "react";
import styleDisplay from "./dropDownDisplay.module.css";
import styleToolbar from "./dropDownToolbar.module.css";
import arrow from "@assets/img/icons/arrow.svg";

interface SelectsInterface {
	id: string;
	payLoad: ReactNode | string;
}

interface Props {
	label: string;
	selects: SelectsInterface[];
	setItem?: (value: string) => void;
	isToolbar?: boolean;
	width?: string;
}

const DropDownDisplay: FC<Props> = ({
	label,
	selects,
	setItem,
	isToolbar = true,
	width = "180px",
}) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [mainSelect, setMainSelect] = useState<ReactNode>(selects[0].payLoad);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const style = isToolbar ? styleToolbar : styleDisplay;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsEnabled(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleClick = () => {
		setIsEnabled(!isEnabled);
	};

	const styleDropDownList = `${style.dropDownList} ${isEnabled ? style.show : ""}`.trim();
	const styleDropDownMenu = `${style.dropDownMenu} ${isEnabled ? style.active : ""}`.trim();
	const styleArrowReverse = isEnabled ? style.reverse : "";

	const handleSelectChange = (newSelect: ReactNode) => {
		setMainSelect(newSelect);
		setItem?.(String(newSelect));
		setIsEnabled(false);
	};

	return (
		<div className={style.dropDown} ref={dropdownRef}>
			<label htmlFor={label}>{label}</label>
			<div className={styleDropDownMenu}>
				<button id={label} onClick={handleClick} style={{ width: width }}>
					{mainSelect}
				</button>
				<img className={styleArrowReverse} src={arrow} alt="arrow" />
				<ul className={styleDropDownList}>
					{selects.map((select) => (
						<li key={select.id} onClick={() => handleSelectChange(select.payLoad)}>
							{select.payLoad}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DropDownDisplay;
