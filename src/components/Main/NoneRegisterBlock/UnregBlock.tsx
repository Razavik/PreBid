import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import Container from "@ui/Container/Container";
import style from "./unregblock.module.css";
import Button, { ColorButton } from "@ui/Button/Button";

interface UnregBlockProps {
	onLoginClick?: () => void;
	onRegisterClick?: () => void;
}

const UnregBlock: FC<UnregBlockProps> = ({ onLoginClick, onRegisterClick }) => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const title: string = "Надежный способ продажи<br>и покупки авто через аукцион";

	if (isAuthenticated) {
		return null;
	}

	return (
		<section className={style.unregBlock}>
			<Container>
				<div className={style.unregBlockContent}>
					<div className={style.unregArticle}>
						<h1 className={style.title} dangerouslySetInnerHTML={{ __html: title }} />
						<div className={style.buttonsContainer}>
							<Button colorButton={ColorButton.BLUE} onClick={onRegisterClick}>
								Зарегистрироваться
							</Button>
							<Button colorButton={ColorButton.GREEN} onClick={onLoginClick}>
								Войти
							</Button>
						</div>
					</div>
					<img src="/src/assets/img/imageUnregBlock.png" alt="image" />
				</div>
			</Container>
		</section>
	);
};

export default UnregBlock;
