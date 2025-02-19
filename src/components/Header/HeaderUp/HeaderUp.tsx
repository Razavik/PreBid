import { FC } from "react";
import DropDown from "@components/ui/DropDownLists/DropDownHeader/DropDownHeader";
import Container from "@ui/Container/Container";

import { SelectsInterface } from "@components/ui/DropDownLists/DropDownHeader/DropDownHeader";

import style from "./headerup.module.css";

const settings = {
	regions: [
		{
			id: "ru-region",
			payLoad: "BY.svg",
		},
		{
			id: "en-region",
			payLoad: "BY.svg",
		},
		{
			id: "by-region",
			payLoad: "BY.svg",
		},
	],
	languages: [
		{
			id: "ru-lang",
			payLoad: "RU",
		},
		{
			id: "en-lang",
			payLoad: "EN",
		},
		{
			id: "by-lang",
			payLoad: "BY",
		},
	],
	currencies: [
		{
			id: "ru-currency",
			payLoad: "Рубль Россия",
		},
		{
			id: "en-currency",
			payLoad: "Доллар США",
		},
		{
			id: "by-currency",
			payLoad: "Рубль Беларусь",
		},
	],
};

const HeaderUp: FC = () => {
	const pathToRegions = "/src/assets/img/icons/";

	const selectsRegion: SelectsInterface[] = settings.regions.map((region) => ({
		id: region.id,
		payLoad: <img src={pathToRegions + region.payLoad} alt={region.id} />,
	}));

	const selectsLang: SelectsInterface[] = settings.languages.map((lang) => ({
		id: lang.id,
		payLoad: lang.payLoad,
	}));

	const selectsCurrency: SelectsInterface[] = settings.currencies.map((currency) => ({
		id: currency.id,
		payLoad: currency.payLoad,
	}));

	return (
		<div className={style.headerUp}>
			<Container>
				<div className={style.headerUpContent}>
					<p>Название страны, город, номер телефона</p>
					<div className={style.localeSettings}>
						<DropDown label="Регион" selects={selectsRegion} />
						<DropDown label="Язык" selects={selectsLang} />
						<DropDown label="Валюта" selects={selectsCurrency} />
					</div>
				</div>
			</Container>
		</div>
	);
};

export default HeaderUp;
