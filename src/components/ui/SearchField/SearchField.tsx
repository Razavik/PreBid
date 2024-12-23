import { FC } from "react";
import style from "./serchfield.module.css";
import searchIcon from "@assets/img/icons/search.svg";

interface SearchField {
	placeholder: string;
}

const SearchField: FC<SearchField> = ({ placeholder }) => {
	return (
		<form className={style.searchField} action="#">
			<input type="text" placeholder={placeholder} />
			<button type="submit">
				<img src={searchIcon} alt="search" />
			</button>
		</form>
	);
};

export default SearchField;
