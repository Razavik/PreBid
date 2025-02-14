import React from "react";
import { Link } from "react-router-dom";
import styles from "./error404.module.css";

const Error404: React.FC = () => {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				Что-то пошло не так. Ссылка удалена или не существовала ранее.
			</p>
			<Link to="/" className={styles.link}>
				Вернуться на главную
			</Link>
		</div>
	);
};

export default Error404;
