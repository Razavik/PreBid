import { useState } from "react";
import Container from "@ui/Container/Container";
import style from "./catalog.module.css";
import Filter from "./Filter/Filter";
import Products from "./Products/Products";
import Pagination from "@ui/Pagination/Pagination";
import Toolbar from "./Toolbar/Toolbar";

const Catalog = () => {
	const [countProducts, setCountProducts] = useState<number>(0);
	const [currentView, setCurrentView] = useState<"tabular" | "card">("tabular");
	const [currentPage, setCurrentPage] = useState<number>(1);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// В будущем здесь будет логика загрузки данных для новой страницы
		console.log(`Переход на страницу ${page}`);
	};

	return (
		<section className={style.catalog}>
			<Container>
				<div className={style.catalogContent}>
					<Filter />
					<div>
						<Toolbar
							countProducts={countProducts}
							currentView={currentView}
							setView={setCurrentView}
						/>
						<Products
							setCountProducts={setCountProducts}
							currentView={currentView}
						/>
						<Pagination
							currentPage={currentPage}
							totalPages={100}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Catalog;
