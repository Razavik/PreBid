import { ReactNode, useState, useRef, useEffect, FC } from "react";
import style from "./dropDownHeader.module.css";
import arrow from "@assets/img/icons/arrow.svg";

export interface SelectsInterface {
	id: string;
	payLoad: ReactNode | string;
}

interface Props {
	label: string;
	selects: SelectsInterface[];
	styleAddition?: object;
}

const DropDown: FC<Props> = ({ label, selects }: Props) => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);
	const [mainSelect, setMainSelect] = useState<ReactNode>(selects[0].payLoad);
	const dropdownRef = useRef<HTMLDivElement>(null);

	function handleClick() {
		setIsEnabled(!isEnabled);
	}

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

	const handleSelectChange = (newSelect: ReactNode) => {
		setMainSelect(newSelect);
		setIsEnabled(false);
	};

	return (
		<div className={style.dropDown} ref={dropdownRef}>
			<label htmlFor={label}>{label}</label>

			<div className={style.dropDownMenu}>
				<button id={label} onClick={handleClick}>
					{mainSelect}
				</button>
				<img className={styleArrowReverse} src={arrow} alt="arrow" />
				<ul className={styleDropDownList}>
					{selects.map((select) => (
						<li
							key={select.id}
							onClick={() => handleSelectChange(select.payLoad)}
						>
							{select.payLoad}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default DropDown;
