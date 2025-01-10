import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import styles from "./Profile.module.css";

const Profile: FC = () => {
	const { info: user, isLoading } = useSelector((state: RootState) => state.user);

	if (isLoading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	if (!user) {
		return <div className={styles.error}>Пользователь не найден</div>;
	}

	const fullName = [user.name_ru, user.second_name_ru].filter(Boolean).join(" ") || "Не указано";

	return (
		<div className={styles.profile}>
			<div className={styles.container}>
				<h1 className={styles.title}>Личный кабинет</h1>
				<div className={styles.card}>
					<div className={styles.header}>
						<h2>Персональные данные</h2>
					</div>
					<div className={styles.content}>
						<div className={styles.field}>
							<span className={styles.label}>ФИО:</span>
							<span className={styles.value}>{fullName}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
