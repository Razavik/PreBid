import { FC, useState } from "react";
import style from "./serchfield.module.css";
import searchIcon from "@assets/img/icons/search.svg";
import backIcon from "@assets/img/icons/back.svg";

interface SearchField {
	placeholder: string;
	onSearchOpen?: () => void;
	onSearchClose?: () => void;
	isActiveSearch?: boolean;
}

const SearchField: FC<SearchField> = ({
	placeholder,
	onSearchOpen,
	onSearchClose,
	isActiveSearch,
}) => {
	const [isSearchVisible, setIsSearchVisible] = useState(
		typeof isActiveSearch === "boolean" ? isActiveSearch : false
	);

	const handleSearchClick = () => {
		setIsSearchVisible(true);
		onSearchOpen?.();
	};

	const handleBackClick = () => {
		setIsSearchVisible(false);
		onSearchClose?.();
	};

	return (
		<div className={style.searchWrapper}>
			<form className={style.searchField} action="#">
				<input type="text" placeholder={placeholder} />
				<button type="submit">
					<img src={searchIcon} alt="search" />
				</button>
			</form>
			<div className={style.mobile}>
				{!isSearchVisible ? (
					<button className={style.searchButton} onClick={handleSearchClick}>
						<img src={searchIcon} alt="search" />
					</button>
				) : (
					<div className={style.searchExpanded}>
						<button className={style.backButton} onClick={handleBackClick}>
							<img src={backIcon} alt="back" />
						</button>
						<form className={style.searchField} action="#">
							<input type="text" placeholder={placeholder} />
							<button type="submit">
								<img src={searchIcon} alt="search" />
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchField;
