import { FC } from "react";
import Container from "@ui/Container/Container";
import style from "./unregblock.module.css";
import Button, { ColorButton } from "@ui/Button/Button";

const UnregBlock: FC = () => {
	const title: string =
		"Надежный способ продажи<br>и покупки авто через аукцион";

	return (
		<section className={style.unregBlock}>
			<Container>
				<div className={style.unregBlockContent}>
					<div className={style.unregArticle}>
						<h1
							className={style.title}
							dangerouslySetInnerHTML={{ __html: title }}
						/>
						<div className={style.buttonsContainer}>
							<Button colorButton={ColorButton.BLUE}>
								Зарегистрироваться
							</Button>
							<Button colorButton={ColorButton.GREEN}>
								Войти
							</Button>
						</div>
					</div>
					<img
						src="/src/assets/img/imageUnregBlock.png"
						alt="image"
					/>
				</div>
			</Container>
		</section>
	);
};

export default UnregBlock;
