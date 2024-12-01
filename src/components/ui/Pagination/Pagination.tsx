import { FC } from "react";
import style from "./pagination.module.css";

interface Props {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
	const renderPageNumbers = () => {
		const pages = [];

		// Добавляем стрелку влево
		pages.push(
			<button
				key="prev"
				className={`${style.pageButton} ${style.arrow}`}
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				‹
			</button>
		);

		// Первая страница всегда видна
		pages.push(
			<button
				key={1}
				className={`${style.pageButton} ${
					currentPage === 1 ? style.active : ""
				}`}
				onClick={() => onPageChange(1)}
			>
				1
			</button>
		);

		// Вычисляем диапазон страниц для отображения
		let startPage = Math.max(2, currentPage - 1);
		let endPage = Math.min(totalPages - 1, currentPage + 1);

		// Специальная обработка для первой страницы
		if (currentPage === 1) {
			startPage = 2;
			endPage = Math.min(totalPages - 1, 3);
		}

		// Добавляем многоточие после первой страницы, если нужно
		if (startPage > 2) {
			pages.push(
				<span key="dots1" className={style.dots}>
					.....
				</span>
			);
		}

		// Средние страницы
		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<button
					key={i}
					className={`${style.pageButton} ${
						currentPage === i ? style.active : ""
					}`}
					onClick={() => onPageChange(i)}
				>
					{i}
				</button>
			);
		}

		// Добавляем многоточие перед последней страницей, если нужно
		if (endPage < totalPages - 1) {
			pages.push(
				<span key="dots2" className={style.dots}>
					.....
				</span>
			);
		}

		// Последняя страница всегда видна
		if (totalPages > 1) {
			pages.push(
				<button
					key={totalPages}
					className={`${style.pageButton} ${
						currentPage === totalPages ? style.active : ""
					}`}
					onClick={() => onPageChange(totalPages)}
				>
					{totalPages}
				</button>
			);
		}

		// Добавляем стрелку вправо
		pages.push(
			<button
				key="next"
				className={`${style.pageButton} ${style.arrow}`}
				onClick={() =>
					currentPage < totalPages && onPageChange(currentPage + 1)
				}
				disabled={currentPage === totalPages}
			>
				›
			</button>
		);

		return pages;
	};

	return <div className={style.pagination}>{renderPageNumbers()}</div>;
};

export default Pagination;
