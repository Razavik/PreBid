import { FC } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "@store/store";
import Button, { ColorButton } from "@ui/Button/Button";
import Container from "@ui/Container/Container";
import style from "./unregblock.module.css";

interface UnregBlockProps {
	onLoginClick: () => void;
	onRegisterClick: () => void;
}

const UnregBlock: FC<UnregBlockProps> = ({ onLoginClick, onRegisterClick }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const location = useLocation();

	if (isAuthenticated || location.pathname.includes("product-card")) {
		return null;
	}

	return (
		<section className={style.unregBlock}>
			<Container>
				<div className={style.unregArticle}>
					<h1 className={style.title}>
						Надежный способ продажи и покупки авто через аукцион
					</h1>
					<div className={style.buttonsContainer}>
						<Button colorButton={ColorButton.BLUE} onClick={onRegisterClick}>
							Зарегистрироваться
						</Button>
						<Button colorButton={ColorButton.GREEN} onClick={onLoginClick}>
							Войти
						</Button>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default UnregBlock;
